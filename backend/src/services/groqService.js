/**
 * TrustLink AI - Groq AI Integration Module
 * Backend API service connecting to Groq LLM (llama-3.3-70b-versatile)
 */

const { Groq } = require('groq-sdk');

let groqClient = null;
if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.startsWith('gsk_')) {
  try {
    groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
  } catch (err) {
    console.warn('Groq client init warning:', err.message);
  }
}

// Fallback Scheme Context for ST Scholarships
const SCHEME_KNOWLEDGE_BASE = `
TrustLink AI Official Knowledge Base - Ministry of Tribal Affairs (MoTA):
1. Pre-Matric Scholarship for ST Students:
   - For ST students studying in Class 9th & 10th in government/recognized schools.
   - Income Ceiling: Family annual income <= ₹2.50 Lakh.
   - Benefit: Day Scholar ₹225/mo, Hosteller ₹525/mo plus book grant.

2. Post-Matric Scholarship for ST Students:
   - For ST students studying in Class 11th, 12th, Graduation, Post-Graduation, Professional & Technical Courses.
   - Income Ceiling: Family annual income <= ₹2.50 Lakh.
   - Benefit: Compulsory non-refundable fees reimbursement + maintenance allowance.

3. National Fellowship for ST Students (NFST):
   - For ST candidates pursuing higher studies: M.Phil and Ph.D. in Indian universities/institutes.
   - Total slots: 750 slots per year.
   - Fellowship Amount: ₹31,000/mo (JRF), ₹35,000/mo (SRF) + HRA + Contingency grant.

4. Top Class Education for ST Students:
   - Covers premier institutes like IITs, IIMs, NITs, AIIMS, NIFTs, NLUs, etc.
   - Income Ceiling: Family annual income <= ₹8.00 Lakh.
   - Benefit: Full tuition fee reimbursement up to ₹2.00 Lakh/yr + Living expenses ₹3,000/mo + Computer allowance ₹45,000.

5. National Overseas Scholarship for ST Students (NOS):
   - For pursuing Master's, Ph.D. and Post-Doctoral research in top foreign universities (QS Top 500).
   - Total awards: 20 slots per year.
   - Income Ceiling: Family annual income <= ₹8.00 Lakh.
   - Age limit: Maximum 35 years.
   - Benefit: Maintenance allowance (USD 15,400/yr or GBP 9,900/yr) + Tuition fees + Air travel + Visa fees.

Deficiency & Correction Process:
- If a document is expired, blurred, or missing, a Deficiency is raised.
- Students must log into their Student Dashboard, navigate to 'Deficiency Raised', and re-upload the requested document.
- Status changes to 'Under Re-Verification' for AI re-scanning and officer sign-off.
`;

/**
 * Natural language chat with TrustLink AI Assistant
 */
async function chatWithAssistant(userMessage, history = [], studentContext = null) {
  if (groqClient) {
    try {
      const messages = [
        {
          role: 'system',
          content: `You are TrustLink AI Assistant, an empathetic, highly knowledgeable AI guide created by the Ministry of Tribal Affairs (MoTA) for Scheduled Tribe (ST) students. 
Answer questions clearly, accurately, and politely based on the following official knowledge base:
${SCHEME_KNOWLEDGE_BASE}
If student context is available: ${JSON.stringify(studentContext || {})}
If information is not available in the system, explicitly state that it is not available.`
        },
        ...history.map(h => ({ role: h.sender === 'user' ? 'user' : 'assistant', content: h.text || h.content })),
        { role: 'user', content: userMessage }
      ];

      const response = await groqClient.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.3,
        max_tokens: 500
      });

      return response.choices[0]?.message?.content || getFallbackAssistantResponse(userMessage);
    } catch (error) {
      console.warn('Groq API chat call failed, utilizing intelligent fallback response:', error.message);
      return getFallbackAssistantResponse(userMessage);
    }
  }

  return getFallbackAssistantResponse(userMessage);
}

function getFallbackAssistantResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('nos') || q.includes('overseas') || q.includes('abroad')) {
    return "The **National Overseas Scholarship (NOS)** provides financial assistance to Scheduled Tribe students for pursuing Master's and Ph.D. courses abroad in top global universities. It covers 20 awardees per year with an annual income ceiling of ₹8.00 Lakh and age limit of 35 years. It covers full tuition fees, living expenses (USD 15,400/yr), and airfare!";
  }
  if (q.includes('nfst') || q.includes('fellowship') || q.includes('phd') || q.includes('mphil')) {
    return "The **National Fellowship for ST Students (NFST)** supports 750 ST scholars annually pursuing M.Phil & Ph.D. degrees in recognized Indian universities. It offers ₹31,000/month for JRF and ₹35,000/month for SRF along with annual contingency grants and HRA.";
  }
  if (q.includes('deficiency') || q.includes('marked') || q.includes('correct') || q.includes('fix')) {
    return "If your application is marked **Deficient**, don't worry! Go to your Student Dashboard under 'Deficiency Raised', click 'Resolve Deficiency', view the specific document error (e.g. expired income certificate), and re-upload a clear updated document. Your application will automatically move to 'Under Re-Verification'.";
  }
  if (q.includes('document') || q.includes('need') || q.includes('upload')) {
    return "Required documents generally include:\n1. ST Caste Certificate (Competent Authority)\n2. Annual Family Income Certificate (Current Fiscal Year)\n3. Marksheets (Class X/XII/Graduation)\n4. Admission Proof / Fee Receipt\n5. Aadhaar Card & Bank Passbook (Aadhaar-seeded account).";
  }
  if (q.includes('status') || q.includes('track') || q.includes('application')) {
    return "You can track your application status in real-time under 'My Applications' on your dashboard. Statuses progress through: Submitted → AI Document Verification → Eligibility Check → Officer Review → Selection → Disbursement.";
  }
  if (q.includes('top class') || q.includes('iit') || q.includes('iim') || q.includes('nit')) {
    return "The **Top Class Education Scheme** is for ST students admitted into notified premier institutions (IITs, IIMs, NITs, AIIMS, NLUs). Income limit is ₹8.00 Lakh/year. Benefits include full tuition fee, ₹3,000/month living expense, and ₹45,000 computer allowance!";
  }
  return "Welcome to TrustLink AI! I can help you check eligible scholarship schemes (Pre-Matric, Post-Matric, NFST, NOS, Top Class), document requirements, resolve application deficiencies, or track your application status. How may I assist your scholarship journey today?";
}

/**
 * AI OCR & Document Verification simulation with field confidence metrics
 */
async function verifyDocumentWithAI(docType, fileName, studentData = {}) {
  const isIncome = docType.toLowerCase().includes('income');
  const isCaste = docType.toLowerCase().includes('caste') || docType.toLowerCase().includes('st');
  const isAcademic = docType.toLowerCase().includes('academic') || docType.toLowerCase().includes('marksheet');
  const isExpiredDoc = fileName.toLowerCase().includes('expired') || fileName.toLowerCase().includes('old');

  // Simulated extracted fields with confidence values
  let extractedFields = {};
  let verificationStatus = 'VERIFIED';
  let isExpired = false;
  let issueReason = null;

  if (isIncome) {
    const annualInc = isExpiredDoc ? 290000 : (studentData.annualIncome || 180000);
    isExpired = isExpiredDoc;
    verificationStatus = isExpired ? 'DEFICIENT' : 'VERIFIED';
    issueReason = isExpired ? 'Income Certificate is expired (Issued over 12 months ago). Current fiscal year certificate required.' : null;

    extractedFields = {
      'Applicant Name': { value: studentData.name || 'Rahul Kumar', confidence: 98 },
      'Certificate Number': { value: `INC-2026-${Math.floor(10000 + Math.random() * 90000)}`, confidence: 95 },
      'Annual Family Income': { value: `₹${Number(annualInc).toLocaleString('en-IN')}`, confidence: 97 },
      'Issue Date': { value: isExpired ? '14/08/2024' : '15/04/2026', confidence: 96 },
      'Issuing Authority': { value: 'Tehsildar / Competent Revenue Authority', confidence: 99 }
    };
  } else if (isCaste) {
    extractedFields = {
      'Candidate Name': { value: studentData.name || 'Rahul Kumar', confidence: 99 },
      'Tribe / Community': { value: studentData.caste || 'Munda (Scheduled Tribe)', confidence: 98 },
      'Certificate No': { value: `ST-JH-2025-${Math.floor(10000 + Math.random() * 90000)}`, confidence: 96 },
      'Issuing District': { value: studentData.district || 'Ranchi, Jharkhand', confidence: 97 },
      'Verification Seal': { value: 'Digital Government Seal Verified', confidence: 100 }
    };
  } else if (isAcademic) {
    extractedFields = {
      'Student Name': { value: studentData.name || 'Rahul Kumar', confidence: 98 },
      'Roll Number': { value: `2024-EXAM-${Math.floor(1000 + Math.random() * 9000)}`, confidence: 94 },
      'Board / University': { value: studentData.institution || 'Ranchi University', confidence: 97 },
      'Aggregate Marks': { value: `${studentData.previousPercentage || 78.5}%`, confidence: 99 },
      'Passing Year': { value: '2025', confidence: 98 }
    };
  } else {
    extractedFields = {
      'Document Title': { value: fileName || 'Uploaded Document', confidence: 95 },
      'Holder Name': { value: studentData.name || 'Rahul Kumar', confidence: 94 },
      'Document ID': { value: `DOC-2026-${Math.floor(1000 + Math.random() * 9000)}`, confidence: 92 },
      'Status': { value: 'Authentic Format Detected', confidence: 96 }
    };
  }

  return {
    docType,
    fileName,
    verificationStatus,
    confidenceScore: Math.round(
      Object.values(extractedFields).reduce((acc, f) => acc + f.confidence, 0) / Object.keys(extractedFields).length
    ),
    extractedFields,
    isExpired,
    issueReason,
    scannedAt: new Date().toISOString()
  };
}

/**
 * Generate AI Officer Assistance Summary & Recommendation
 */
async function generateOfficerSummary(application, student, scheme, verificationResults = []) {
  const verifiedCount = verificationResults.filter(v => v.verificationStatus === 'VERIFIED').length;
  const totalDocs = verificationResults.length || 5;
  const hasDeficiency = verificationResults.some(v => v.verificationStatus === 'DEFICIENT' || v.isExpired);
  
  const score = application.eligibilityScore || (hasDeficiency ? 68 : 94);
  const potentialIssues = hasDeficiency ? 1 : 0;

  let recommendationText = '';
  if (hasDeficiency) {
    recommendationText = 'Application flagged with 1 document discrepancy (Expired/Invalid Income Certificate). Recommend requesting student deficiency update before final decision.';
  } else if (score >= 85) {
    recommendationText = 'Application appears fully eligible based on configured scheme rules, verified ST caste credentials, and income criteria. Recommended for Official Sanction.';
  } else {
    recommendationText = 'Application requires secondary manual check by authorized verification officer due to academic score threshold.';
  }

  return {
    documentsVerified: `${verifiedCount}/${totalDocs}`,
    potentialIssues,
    eligibilityMatch: `${score}%`,
    missingInformation: hasDeficiency ? 1 : 0,
    riskFlags: potentialIssues,
    aiRecommendation: recommendationText,
    disclaimer: 'AI assists verification. Final decision remains with authorized government officials.',
    generatedAt: new Date().toISOString()
  };
}

module.exports = {
  chatWithAssistant,
  verifyDocumentWithAI,
  generateOfficerSummary
};

/**
 * ScholarLink AI - Configurable Scheme Eligibility Rules Engine
 */

function evaluateEligibility(applicantData, scheme, documents = []) {
  const rules = scheme.eligibilityRules || [];
  const results = [];
  let isEligible = true;
  let score = 100;
  const deficiencies = [];
  const missingDocuments = [];

  // Check mandatory scheme documents
  const requiredDocTypes = scheme.requiredDocuments || [];
  const uploadedDocTypes = documents.map(d => d.type || d.documentType);

  for (const reqDoc of requiredDocTypes) {
    const uploaded = documents.find(d => (d.type || d.documentType) === reqDoc.type);
    if (!uploaded) {
      isEligible = false;
      score -= 15;
      missingDocuments.push(reqDoc.title || reqDoc.type);
      deficiencies.push({
        type: 'MISSING_DOCUMENT',
        documentType: reqDoc.type,
        title: reqDoc.title || reqDoc.type,
        issue: `Mandatory document "${reqDoc.title || reqDoc.type}" is missing from application.`,
        actionRequired: `Please upload a clear, scanned PDF or image of your official ${reqDoc.title || reqDoc.type}.`
      });
    } else if (uploaded.verificationStatus === 'DEFICIENT' || uploaded.isExpired) {
      isEligible = false;
      score -= 20;
      deficiencies.push({
        type: 'INVALID_DOCUMENT',
        documentType: uploaded.type,
        title: uploaded.name || uploaded.type,
        issue: uploaded.verificationDetails?.reason || uploaded.deficiencyReason || 'Document verification flagged an issue (e.g., expired or illegible).',
        actionRequired: 'Please re-upload a valid, current document to proceed.'
      });
    }
  }

  // 1. Income Limit Rule
  if (scheme.maxAnnualIncome) {
    const applicantIncome = Number(applicantData.annualIncome || 0);
    const passed = applicantIncome <= scheme.maxAnnualIncome;
    results.push({
      ruleName: 'Family Income Criteria',
      description: `Annual family income must be ≤ ₹${scheme.maxAnnualIncome.toLocaleString('en-IN')}`,
      value: `₹${applicantIncome.toLocaleString('en-IN')}`,
      passed,
      reason: passed ? 'Income is within authorized scheme limits.' : `Family income ₹${applicantIncome.toLocaleString('en-IN')} exceeds limit ₹${scheme.maxAnnualIncome.toLocaleString('en-IN')}.`
    });

    if (!passed) {
      isEligible = false;
      score -= 40;
    }
  }

  // 2. Category Rule
  if (scheme.allowedCategories && scheme.allowedCategories.length > 0) {
    const applicantCategory = (applicantData.category || 'ST').toUpperCase();
    const passed = scheme.allowedCategories.includes(applicantCategory);
    results.push({
      ruleName: 'Category Mandate',
      description: `Must belong to Scheduled Tribe (ST) category`,
      value: applicantCategory,
      passed,
      reason: passed ? 'Applicant identified as Scheduled Tribe (ST).' : 'Applicant does not belong to authorized Scheduled Tribe category.'
    });

    if (!passed) {
      isEligible = false;
      score = 0;
    }
  }

  // 3. Academic Percentage Rule
  if (scheme.minPercentage) {
    const applicantPercentage = Number(applicantData.previousPercentage || applicantData.percentage || 0);
    const passed = applicantPercentage >= scheme.minPercentage;
    results.push({
      ruleName: 'Minimum Academic Performance',
      description: `Minimum aggregate marks required: ${scheme.minPercentage}%`,
      value: `${applicantPercentage}%`,
      passed,
      reason: passed ? 'Academic score meets mandatory cutoff threshold.' : `Marks ${applicantPercentage}% fall short of required ${scheme.minPercentage}%.`
    });

    if (!passed) {
      isEligible = false;
      score -= 25;
    }
  }

  // 4. Age Limit Rule
  if (scheme.maxAge) {
    const applicantAge = Number(applicantData.age || 21);
    const passed = applicantAge <= scheme.maxAge;
    results.push({
      ruleName: 'Maximum Age Limit',
      description: `Age must not exceed ${scheme.maxAge} years`,
      value: `${applicantAge} years`,
      passed,
      reason: passed ? 'Age is within permissible range.' : `Applicant age (${applicantAge}) exceeds max allowable age (${scheme.maxAge}).`
    });

    if (!passed) {
      isEligible = false;
      score -= 30;
    }
  }

  score = Math.max(0, Math.min(100, score));

  return {
    isEligible,
    eligibilityScore: score,
    ruleResults: results,
    missingDocuments,
    deficiencies,
    evaluatedAt: new Date().toISOString()
  };
}

module.exports = {
  evaluateEligibility
};

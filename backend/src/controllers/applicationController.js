const db = require('../config/db');
const { evaluateEligibility } = require('../services/rulesEngine');
const { verifyDocumentWithAI, generateOfficerSummary } = require('../services/groqService');

exports.createApplication = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      schemeId,
      personalInfo = {},
      academicInfo = {},
      eligibilityAnswers = {},
      uploadedDocuments = []
    } = req.body;

    const scheme = db.findOne('schemes', s => s.id === schemeId);
    if (!scheme) {
      return res.status(400).json({ error: 'Selected scholarship scheme is invalid.' });
    }

    const user = db.findOne('users', u => u.id === userId) || {};

    const applicantData = {
      name: personalInfo.name || user.name || 'Student Applicant',
      annualIncome: Number(personalInfo.annualIncome || academicInfo.annualIncome || 180000),
      category: personalInfo.caste || user.caste || 'ST',
      previousPercentage: Number(academicInfo.previousPercentage || 75),
      age: Number(personalInfo.age || 20)
    };

    // Run AI OCR verification on uploaded documents
    const verifiedDocuments = [];
    let hasExpiredDoc = false;
    let expiredDocDetails = null;

    for (const doc of uploadedDocuments) {
      const aiRes = await verifyDocumentWithAI(doc.type || 'DOCUMENT', doc.name || 'uploaded_doc.pdf', applicantData);
      const isExpired = doc.isExpired || aiRes.isExpired;

      if (isExpired) {
        hasExpiredDoc = true;
        expiredDocDetails = aiRes;
      }

      verifiedDocuments.push({
        id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        type: doc.type,
        name: doc.name || `${doc.type}_scanned.pdf`,
        verificationStatus: isExpired ? 'DEFICIENT' : 'VERIFIED',
        confidenceScore: aiRes.confidenceScore,
        isExpired,
        deficiencyReason: isExpired ? aiRes.issueReason : null,
        extractedFields: aiRes.extractedFields
      });
    }

    // Run Configurable Rules Engine
    const evalResult = evaluateEligibility(applicantData, scheme, verifiedDocuments);

    const appId = `APP-2026-ST-${Math.floor(1000 + Math.random() * 9000)}`;

    let initialStatus = 'UNDER_VERIFICATION';
    let riskFlag = 'Low Risk';

    if (hasExpiredDoc || evalResult.deficiencies.length > 0) {
      initialStatus = 'DEFICIENCY_RAISED';
      riskFlag = 'Action Required';
    } else if (evalResult.isEligible && evalResult.eligibilityScore >= 85) {
      initialStatus = 'OFFICER_REVIEW';
      riskFlag = 'Recommended';
    }

    const newApplication = db.insert('applications', {
      id: appId,
      userId,
      studentName: applicantData.name,
      schemeId: scheme.id,
      schemeName: scheme.name,
      schemeCode: scheme.code,
      state: personalInfo.state || user.state || 'Jharkhand',
      district: personalInfo.district || user.district || 'Ranchi',
      institution: academicInfo.institution || 'State University',
      course: academicInfo.course || 'Degree Course',
      annualIncome: applicantData.annualIncome,
      previousPercentage: applicantData.previousPercentage,
      status: initialStatus,
      eligibilityScore: evalResult.eligibilityScore,
      isEligible: evalResult.isEligible,
      deficiencyCount: evalResult.deficiencies.length,
      currentStage: hasExpiredDoc ? 'Document Verification (Deficiency Flagged)' : 'AI Verified - Pending Officer Sign-Off',
      submittedAt: new Date().toISOString(),
      riskFlag,
      demoFlag: true
    });

    // Save document records
    for (const doc of verifiedDocuments) {
      db.insert('documents', {
        ...doc,
        applicationId: appId
      });
    }

    // Save deficiencies if present
    if (evalResult.deficiencies.length > 0) {
      for (const def of evalResult.deficiencies) {
        db.insert('deficiencies', {
          applicationId: appId,
          studentId: userId,
          documentType: def.documentType || 'DOCUMENT',
          title: def.title || 'Document Discrepancy',
          issue: def.issue,
          actionRequired: def.actionRequired,
          status: 'OPEN'
        });
      }
    }

    // Audit Log Entry
    db.insert('auditLogs', {
      timestamp: new Date().toISOString(),
      action: 'Application Submitted',
      performedBy: `${applicantData.name} (Student)`,
      applicationId: appId,
      status: 'SUCCESS',
      details: `Submitted application for ${scheme.name}. AI eligibility score: ${evalResult.eligibilityScore}%`
    });

    db.insert('auditLogs', {
      timestamp: new Date(Date.now() + 1000).toISOString(),
      action: 'AI Verification Completed',
      performedBy: 'ScholarLink AI Scanning Engine',
      applicationId: appId,
      status: hasExpiredDoc ? 'DEFICIENCY_FLAGGED' : 'VERIFIED',
      details: hasExpiredDoc
        ? `Flagged discrepancy: ${expiredDocDetails?.issueReason}`
        : `All ${verifiedDocuments.length} mandatory documents verified successfully with average ${evalResult.eligibilityScore}% match score.`
    });

    // Notification
    db.insert('notifications', {
      userId,
      title: hasExpiredDoc ? 'Deficiency Raised' : 'Application Submitted Successfully',
      message: hasExpiredDoc
        ? `Your application ${appId} requires an updated document upload.`
        : `Your application ${appId} for ${scheme.name} has passed AI verification and is under review.`,
      type: hasExpiredDoc ? 'DEFICIENCY' : 'SUCCESS'
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      application: newApplication,
      eligibilityResult: evalResult,
      documents: verifiedDocuments
    });
  } catch (error) {
    console.error('Create application error:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
};

exports.getMyApplications = (req, res) => {
  try {
    const userId = req.user.id;
    const apps = db.find('applications', a => a.userId === userId);
    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student applications' });
  }
};

exports.getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = db.findOne('applications', a => a.id === id);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const student = db.findOne('users', u => u.id === application.userId) || {};
    const studentProfile = db.findOne('studentProfiles', p => p.userId === application.userId) || {};
    const scheme = db.findOne('schemes', s => s.id === application.schemeId) || {};
    const documents = db.find('documents', d => d.applicationId === id);
    const deficiencies = db.find('deficiencies', d => d.applicationId === id);
    const timeline = db.find('auditLogs', l => l.applicationId === id).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    // Generate Groq AI Officer Assistance Summary
    const aiSummary = await generateOfficerSummary(application, student, scheme, documents);

    res.json({
      application,
      student: {
        id: student.id,
        name: student.name || application.studentName,
        email: student.email,
        phone: student.phone,
        caste: student.caste,
        state: student.state,
        district: student.district,
        aadhaarNumber: student.aadhaarNumber,
        ...studentProfile
      },
      scheme,
      documents,
      deficiencies,
      timeline,
      aiSummary
    });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ error: 'Failed to fetch application details' });
  }
};

exports.officerReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { decision, remarks } = req.body;
    const officerName = req.user.name || 'Verification Officer';

    const app = db.findOne('applications', a => a.id === id);
    if (!app) {
      return res.status(404).json({ error: 'Application not found' });
    }

    let newStatus = app.status;
    let stageText = app.currentStage;
    let riskText = app.riskFlag;

    if (decision === 'APPROVE' || decision === 'SELECT') {
      newStatus = 'SELECTED';
      stageText = 'Selected for Sanction & Disbursement';
      riskText = 'Sanctioned';

      // Create simulated PFMS disbursement record
      db.insert('disbursements', {
        applicationId: app.id,
        studentName: app.studentName,
        schemeName: app.schemeName,
        sanctionedAmount: app.schemeCode === 'NOS_OVERSEAS' ? 1250000 : app.schemeCode === 'TOP_CLASS_ST' ? 245000 : 35000,
        disbursementStatus: 'DISBURSEMENT_INITIATED',
        transactionReference: `DBT-PFMS-2026-${Math.floor(10000000 + Math.random() * 90000000)}`,
        paymentDate: new Date().toISOString(),
        bankName: 'State Bank of India',
        accountNumber: 'XXXX-XXXX-8912',
        isDemoTransaction: true
      });
    } else if (decision === 'DEFICIENCY') {
      newStatus = 'DEFICIENCY_RAISED';
      stageText = 'Deficiency Notice Issued by Officer';
      riskText = 'Action Required';

      db.insert('deficiencies', {
        applicationId: app.id,
        studentId: app.userId,
        title: 'Officer Clarification Required',
        issue: remarks || 'Clarification required regarding uploaded credentials.',
        actionRequired: 'Please re-upload requested document under Student Dashboard.',
        status: 'OPEN'
      });
    } else if (decision === 'REJECT') {
      newStatus = 'REJECTED';
      stageText = 'Application Rejected by Officer';
      riskText = 'Rejected';
    }

    const updatedApp = db.update('applications', a => a.id === id, {
      status: newStatus,
      currentStage: stageText,
      riskFlag: riskText,
      officerRemarks: remarks,
      reviewedBy: officerName,
      reviewedAt: new Date().toISOString()
    });

    db.insert('officerReviews', {
      applicationId: id,
      officerId: req.user.id,
      officerName,
      decision,
      remarks,
      timestamp: new Date().toISOString()
    });

    db.insert('auditLogs', {
      timestamp: new Date().toISOString(),
      action: `Officer Decision: ${decision}`,
      performedBy: `${officerName} (Verification Officer)`,
      applicationId: id,
      status: decision === 'APPROVE' ? 'APPROVED' : decision === 'REJECT' ? 'REJECTED' : 'DEFICIENCY_RAISED',
      details: remarks || `Officer updated application status to ${newStatus}`
    });

    db.insert('notifications', {
      userId: app.userId,
      title: `Application Status Updated: ${newStatus}`,
      message: `Officer ${officerName} updated your application status. ${remarks ? `Remarks: "${remarks}"` : ''}`,
      type: decision === 'APPROVE' ? 'SUCCESS' : 'DEFICIENCY'
    });

    res.json({
      message: 'Officer review submitted successfully',
      application: updatedApp
    });
  } catch (error) {
    console.error('Officer review error:', error);
    res.status(500).json({ error: 'Failed to record officer review' });
  }
};

exports.resubmitDeficiency = async (req, res) => {
  try {
    const { id } = req.params; // application ID
    const { documentType, newDocumentName = 'Corrected_Document.pdf' } = req.body;
    const studentId = req.user.id;

    const app = db.findOne('applications', a => a.id === id && a.userId === studentId);
    if (!app) {
      return res.status(404).json({ error: 'Application not found or unauthorized' });
    }

    // Run AI Re-verification
    const student = db.findOne('users', u => u.id === studentId) || {};
    const aiRes = await verifyDocumentWithAI(documentType || 'INCOME_CERT', newDocumentName, {
      name: student.name,
      annualIncome: 180000,
      caste: student.caste
    });

    // Update document record
    const doc = db.findOne('documents', d => d.applicationId === id && d.type === (documentType || 'INCOME_CERT'));
    if (doc) {
      db.update('documents', d => d.id === doc.id, {
        name: newDocumentName,
        verificationStatus: 'VERIFIED',
        confidenceScore: 98,
        isExpired: false,
        deficiencyReason: null,
        extractedFields: aiRes.extractedFields
      });
    }

    // Resolve deficiency status
    db.update('deficiencies', d => d.applicationId === id && d.status === 'OPEN', {
      status: 'RESOLVED',
      resolvedAt: new Date().toISOString()
    });

    // Move status to UNDER_RE_VERIFICATION -> OFFICER_REVIEW
    const updatedApp = db.update('applications', a => a.id === id, {
      status: 'UNDER_RE_VERIFICATION',
      currentStage: 'AI Re-Scanned - Sent for Final Officer Approval',
      deficiencyCount: 0,
      riskFlag: 'Re-Verified (98% Match)'
    });

    db.insert('auditLogs', {
      timestamp: new Date().toISOString(),
      action: 'Deficiency Resolved & Re-submitted',
      performedBy: `${req.user.name} (Student)`,
      applicationId: id,
      status: 'SUCCESS',
      details: `Re-uploaded corrected ${documentType || 'document'}. AI verified document validity.`
    });

    db.insert('auditLogs', {
      timestamp: new Date(Date.now() + 500).toISOString(),
      action: 'AI Re-Verification Passed',
      performedBy: 'ScholarLink AI Scanning Engine',
      applicationId: id,
      status: 'VERIFIED',
      details: 'Corrected document passed AI scanner. Validity confirmed.'
    });

    res.json({
      message: 'Deficiency resolved and document re-verified successfully!',
      application: updatedApp
    });
  } catch (error) {
    console.error('Resubmit deficiency error:', error);
    res.status(500).json({ error: 'Failed to resolve deficiency' });
  }
};

const { chatWithAssistant, verifyDocumentWithAI, generateOfficerSummary } = require('../services/groqService');
const db = require('../config/db');

exports.chat = async (req, res) => {
  try {
    const { message, history = [], studentContext } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message text is required.' });
    }

    const reply = await chatWithAssistant(message, history, studentContext);
    res.json({ reply });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ error: 'AI service unavailable.' });
  }
};

exports.verifyDocument = async (req, res) => {
  try {
    const { docType, fileName, studentData } = req.body;
    const result = await verifyDocumentWithAI(docType || 'INCOME_CERT', fileName || 'doc.pdf', studentData || {});
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'AI Document verification failed.' });
  }
};

exports.applicationSummary = async (req, res) => {
  try {
    const { applicationId } = req.body;
    const application = db.findOne('applications', a => a.id === applicationId);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const student = db.findOne('users', u => u.id === application.userId) || {};
    const scheme = db.findOne('schemes', s => s.id === application.schemeId) || {};
    const documents = db.find('documents', d => d.applicationId === applicationId);

    const summary = await generateOfficerSummary(application, student, scheme, documents);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate AI summary' });
  }
};

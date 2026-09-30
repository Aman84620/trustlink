const db = require('../config/db');

exports.getMyDisbursements = (req, res) => {
  try {
    const userId = req.user.id;
    const studentApps = db.find('applications', a => a.userId === userId);
    const appIds = studentApps.map(a => a.id);

    const disbursements = db.find('disbursements', d => appIds.includes(d.applicationId));
    res.json(disbursements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student disbursements' });
  }
};

exports.getAllDisbursements = (req, res) => {
  try {
    const disbursements = db.getCollection('disbursements');
    res.json(disbursements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all disbursements' });
  }
};

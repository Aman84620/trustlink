const db = require('../config/db');

exports.getAllSchemes = (req, res) => {
  try {
    const schemes = db.getCollection('schemes');
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scholarship schemes' });
  }
};

exports.getSchemeById = (req, res) => {
  try {
    const { id } = req.params;
    const scheme = db.findOne('schemes', s => s.id === id || s.code === id);
    if (!scheme) {
      return res.status(404).json({ error: 'Scheme not found' });
    }
    res.json(scheme);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scheme details' });
  }
};

exports.createScheme = (req, res) => {
  try {
    const { name, code, category, targetAudience, description, maxAnnualIncome, minPercentage, requiredDocuments } = req.body;
    
    if (!name || !code) {
      return res.status(400).json({ error: 'Scheme name and code are required' });
    }

    const newScheme = db.insert('schemes', {
      code,
      name,
      category: category || 'General',
      targetAudience: targetAudience || 'ST Students',
      description: description || '',
      maxAnnualIncome: maxAnnualIncome ? Number(maxAnnualIncome) : 250000,
      allowedCategories: ['ST'],
      minPercentage: minPercentage ? Number(minPercentage) : 50,
      financialBenefit: req.body.financialBenefit || 'Tuition fee reimbursement + Monthly allowance',
      requiredDocuments: requiredDocuments || [
        { type: 'CASTE_CERT', title: 'ST Caste Certificate' },
        { type: 'INCOME_CERT', title: 'Annual Family Income Certificate' }
      ]
    });

    res.status(201).json(newScheme);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create scheme' });
  }
};

exports.updateScheme = (req, res) => {
  try {
    const { id } = req.params;
    const updated = db.update('schemes', s => s.id === id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Scheme not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update scheme' });
  }
};

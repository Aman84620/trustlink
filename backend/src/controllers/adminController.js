const db = require('../config/db');

exports.getAnalytics = (req, res) => {
  try {
    const apps = db.getCollection('applications');
    const totalApps = apps.length + 3000000; // Realistic demo scale baseline
    const processed = 2840000;
    const pending = 160000;
    const selected = 2450000;

    const stateWiseDistribution = [
      { state: 'Jharkhand', applications: 780000, selected: 690000, deficiencyRate: '5.2%' },
      { state: 'Odisha', applications: 650000, selected: 580000, deficiencyRate: '4.8%' },
      { state: 'Chhattisgarh', applications: 520000, selected: 460000, deficiencyRate: '6.1%' },
      { state: 'Madhya Pradesh', applications: 610000, selected: 530000, deficiencyRate: '5.9%' },
      { state: 'Assam', applications: 240000, selected: 210000, deficiencyRate: '4.1%' },
      { state: 'West Bengal', applications: 200000, selected: 175000, deficiencyRate: '5.5%' }
    ];

    const deficiencyTrends = [
      { category: 'Expired Income Certificate', percentage: 48 },
      { category: 'Caste Certificate Verification Delay', percentage: 22 },
      { category: 'Illegible Marksheet Scan', percentage: 18 },
      { category: 'Bank Aadhaar Seeding Pending', percentage: 12 }
    ];

    res.json({
      summary: {
        totalApplications: '30+ Lakh',
        totalProcessed: '28.4 Lakh',
        pendingApplications: '1.6 Lakh',
        selectedApplicants: '24.5 Lakh',
        averageProcessingDays: '3.4 Days (Down from 45 Days)',
        aiVerificationAccuracy: '98.4%'
      },
      stateWiseDistribution,
      deficiencyTrends
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin analytics' });
  }
};

exports.getAuditLogs = (req, res) => {
  try {
    const logs = db.getCollection('auditLogs');
    res.json(logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
};

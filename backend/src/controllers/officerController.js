const db = require('../config/db');

exports.getDashboardStats = (req, res) => {
  try {
    const apps = db.getCollection('applications');

    const totalApplications = apps.length;
    const pendingVerification = apps.filter(a => a.status === 'UNDER_VERIFICATION' || a.status === 'SUBMITTED' || a.status === 'UNDER_RE_VERIFICATION').length;
    const deficiencyRaised = apps.filter(a => a.status === 'DEFICIENCY_RAISED').length;
    const eligible = apps.filter(a => a.status === 'OFFICER_REVIEW' || a.isEligible).length;
    const selected = apps.filter(a => a.status === 'SELECTED').length;
    const rejected = apps.filter(a => a.status === 'REJECTED').length;

    // Distribution by Scheme
    const schemeCounts = {};
    apps.forEach(a => {
      const name = a.schemeCode || a.schemeName || 'Other';
      schemeCounts[name] = (schemeCounts[name] || 0) + 1;
    });

    const applicationsByScheme = Object.keys(schemeCounts).map(key => ({
      name: key,
      count: schemeCounts[key]
    }));

    // Distribution by State
    const stateCounts = {};
    apps.forEach(a => {
      const st = a.state || 'Jharkhand';
      stateCounts[st] = (stateCounts[st] || 0) + 1;
    });

    const applicationsByState = Object.keys(stateCounts).map(key => ({
      state: key,
      count: stateCounts[key]
    }));

    // Verification Status Chart
    const statusDistribution = [
      { name: 'Under Verification', value: pendingVerification, color: '#3b82f6' },
      { name: 'Deficiency Raised', value: deficiencyRaised, color: '#f97316' },
      { name: 'Eligible / Review', value: eligible, color: '#0d9488' },
      { name: 'Selected / Sanctioned', value: selected, color: '#10b981' },
      { name: 'Rejected', value: rejected, color: '#ef4444' }
    ];

    // Monthly Trend Simulation
    const monthlyApplications = [
      { month: 'May', applications: 120, verified: 110, selected: 95 },
      { month: 'Jun', applications: 240, verified: 210, selected: 180 },
      { month: 'Jul', applications: 480, verified: 450, selected: 410 },
      { month: 'Aug', applications: 890, verified: 820, selected: 760 },
      { month: 'Sep', applications: 1250, verified: 1180, selected: 1040 }
    ];

    res.json({
      totalApplications: totalApplications + 3420, // Add demo scale baseline
      pendingVerification: pendingVerification + 180,
      deficiencyRaised: deficiencyRaised + 94,
      eligible: eligible + 1820,
      selected: selected + 1150,
      rejected: rejected + 176,
      applicationsByScheme,
      applicationsByState,
      statusDistribution,
      monthlyApplications
    });
  } catch (error) {
    console.error('Officer dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to fetch officer dashboard statistics' });
  }
};

exports.getApplications = (req, res) => {
  try {
    let apps = db.getCollection('applications');
    const { scheme, state, district, status, search, risk } = req.query;

    if (scheme) {
      apps = apps.filter(a => a.schemeId === scheme || a.schemeCode === scheme);
    }
    if (state) {
      apps = apps.filter(a => (a.state || '').toLowerCase().includes(state.toLowerCase()));
    }
    if (district) {
      apps = apps.filter(a => (a.district || '').toLowerCase().includes(district.toLowerCase()));
    }
    if (status) {
      apps = apps.filter(a => a.status === status);
    }
    if (risk) {
      apps = apps.filter(a => (a.riskFlag || '').toLowerCase().includes(risk.toLowerCase()));
    }
    if (search) {
      const q = search.toLowerCase();
      apps = apps.filter(a =>
        a.id.toLowerCase().includes(q) ||
        a.studentName.toLowerCase().includes(q) ||
        a.schemeName.toLowerCase().includes(q) ||
        (a.institution || '').toLowerCase().includes(q)
      );
    }

    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications list' });
  }
};

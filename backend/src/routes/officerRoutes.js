const express = require('express');
const router = express.Router();
const officerController = require('../controllers/officerController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.get('/dashboard-stats', authenticateToken, requireRole('OFFICER', 'ADMIN'), officerController.getDashboardStats);
router.get('/applications', authenticateToken, requireRole('OFFICER', 'ADMIN'), officerController.getApplications);

module.exports = router;

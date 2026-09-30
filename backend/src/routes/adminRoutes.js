const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.get('/analytics', authenticateToken, requireRole('ADMIN'), adminController.getAnalytics);
router.get('/audit-logs', authenticateToken, requireRole('ADMIN'), adminController.getAuditLogs);

module.exports = router;

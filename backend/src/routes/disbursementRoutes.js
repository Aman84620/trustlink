const express = require('express');
const router = express.Router();
const disbursementController = require('../controllers/disbursementController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.get('/my-disbursements', authenticateToken, requireRole('STUDENT'), disbursementController.getMyDisbursements);
router.get('/all-disbursements', authenticateToken, requireRole('OFFICER', 'ADMIN'), disbursementController.getAllDisbursements);

module.exports = router;

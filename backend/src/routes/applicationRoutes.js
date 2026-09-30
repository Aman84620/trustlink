const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, requireRole('STUDENT'), applicationController.createApplication);
router.get('/my-applications', authenticateToken, requireRole('STUDENT'), applicationController.getMyApplications);
router.get('/:id', authenticateToken, applicationController.getApplicationById);
router.post('/:id/officer-review', authenticateToken, requireRole('OFFICER', 'ADMIN'), applicationController.officerReview);
router.post('/:id/resubmit', authenticateToken, requireRole('STUDENT'), applicationController.resubmitDeficiency);

module.exports = router;

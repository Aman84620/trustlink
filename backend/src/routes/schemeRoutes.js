const express = require('express');
const router = express.Router();
const schemeController = require('../controllers/schemeController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.get('/', schemeController.getAllSchemes);
router.get('/:id', schemeController.getSchemeById);
router.post('/', authenticateToken, requireRole('ADMIN'), schemeController.createScheme);
router.put('/:id', authenticateToken, requireRole('ADMIN'), schemeController.updateScheme);

module.exports = router;

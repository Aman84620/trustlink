const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/chat', aiController.chat);
router.post('/verify-document', aiController.verifyDocument);
router.post('/application-summary', aiController.applicationSummary);

module.exports = router;

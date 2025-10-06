const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const { protect } = require('../middleware/authMiddleware');

router.post('/submit', protect, examController.submitExam);
router.get('/attempts/:userId?', protect, examController.getAttemptsForUser);

module.exports = router;
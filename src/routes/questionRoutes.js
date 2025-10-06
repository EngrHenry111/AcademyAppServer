const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.get('/random/:subject/:count/:examType?', questionController.getRandomQuestions);
router.post('/', protect, requireRole('tutor'), questionController.createQuestion);
router.get('/', questionController.listQuestions);

module.exports = router;
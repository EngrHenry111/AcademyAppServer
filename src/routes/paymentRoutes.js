const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/initiate', protect, paymentController.initiate);
router.post('/verify', paymentController.verify);

module.exports = router;
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register',
  [ body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min:6 }) ],
  authController.register);

router.post('/login', authController.login);
router.get('/me', protect, authController.me);

module.exports = router;
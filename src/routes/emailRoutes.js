const express = require('express');
const router = express.Router();

// Dummy controller functions
const { sendEmail, verifyEmail } = require('../controllers/emailController');

router.post('/send', sendEmail);
router.post('/verify', verifyEmail);

module.exports = router;

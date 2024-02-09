const express = require('express');
const router = express.Router();

// Dummy controller functions
const { sendSMS, verifyOTP } = require('../controllers/smsController');

router.post('/send', sendSMS);
router.post('/verify', verifyOTP);

module.exports = router;

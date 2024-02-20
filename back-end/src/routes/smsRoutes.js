const express = require('express');
const router = express.Router();

const { sendSMS, verifyOTP } = require('../controllers/smsController');

router.post('/send', sendSMS);
router.post('/verify', verifyOTP);

module.exports = router;

const sendSMS = (req, res) => {
    // Implementation
    res.send("SMS sent successfully.");
};

const verifyOTP = (req, res) => {
    // Implementation
    res.send("OTP verified successfully.");
};

module.exports = { sendSMS, verifyOTP };

const sendEmail = (req, res) => {
    res.send('Send email function');
};

const verifyEmail = (req, res) => {
    res.send('Verify email function');
};

module.exports = {
    sendEmail,
    verifyEmail,
};
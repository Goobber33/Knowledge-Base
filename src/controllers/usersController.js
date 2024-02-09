const registerUser = (req, res) => {
    res.send('User registered');
};

const loginUser = (req, res) => {
    res.send('User logged in');
};

const resetPassword = (req, res) => {
    res.send('Password reset');
};

module.exports = {
    registerUser,
    loginUser,
    resetPassword,
};
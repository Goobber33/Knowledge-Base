module.exports = (req, res, next) => {
    console.log('Auth Middleware called');
    next();
};

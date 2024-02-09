module.exports = (req, res, next) => {
    console.log('Validation Middleware called');
    next();
};

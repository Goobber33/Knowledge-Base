const authMiddleware = (req, res, next) => {
    console.log('Auth Middleware called');
    next();
};

const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};

const requestLoggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
};

const validationMiddleware = (req, res, next) => {
    console.log('Validation Middleware called');
    next();
};

module.exports = {
    authMiddleware,
    errorMiddleware,
    requestLoggerMiddleware,
    validationMiddleware
};

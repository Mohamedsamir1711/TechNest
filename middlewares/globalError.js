const AppError = require('../utils/AppError');

const globalError = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'TokenExpiredError') error = new AppError(401, 'Expired Token');
    if (err.name === 'JsonWebTokenError') error = new AppError(400, 'Invalid Token');

    if (err.name === 'CastError') error = new AppError(400, `Invalid MongoDB ID ${err.value}`);
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const messages = {
            email: 'Email is already registered',
            username: 'Username is already taken',
        };
        error = new AppError(400, messages[field] || `Duplicate value for ${field}`);
    }

    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message).join('. ');
        error = new AppError(400, `Validation error: ${messages}`);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Internal Server Error!',
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
};

module.exports = globalError;
const AppError = require('../utils/AppError');

const validator = schema => async (req, res, next) => {
    try {
        const checkSchema = await schema.validate(req.body, { abortEarly: false });

     if (checkSchema)   next();

    } catch (err) {
        const error = err.errors.join(', ');
        next(new AppError(err));
    }
};

module.exports = validator;
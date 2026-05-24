const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const restircTo = (...roles) => catchAsync(async (req, res, next) => {
    const {role} = req.user;
    if (roles.includes(role)) {
         next();
    } else {
        next(new AppError(403, 'Forbbiden, this route is protected'))
    }
});

module.exports = restircTo;

const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const User = require('../model/user');

const authMiddle = catchAsync(async (req, res, next) => {
    
    if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const {id} = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      return next(new AppError(401, 'You are not logged in!'));
    }
    req.user = user;
    next();
    } else {
    return next(new AppError(400, 'Please Login first'));
}
});


module.exports = authMiddle;
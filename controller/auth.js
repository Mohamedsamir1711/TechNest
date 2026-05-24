const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { sendEmail } = require('../utils/sendEmail');
const { customAlphabet } = require('nanoid');

const jwtSign = promisify(jwt.sign);
const saltRounds = Number(process.env.SALT_ROUND) || 10;

exports.signUp = catchAsync(async (req, res, next) => {
    const { email, password, username } = req.body;

    if (await User.findOne({ email })) {
        return next(new AppError(400, 'Email is already registered'));
    }
    if (username && (await User.findOne({ username }))) {
        return next(new AppError(400, 'Username is already taken'));
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const OTP = customAlphabet('1234567890', 6)();
    const confirmOTP = await bcrypt.hash(OTP, saltRounds);
    const otpDate = Date.now() + 10 * 60 * 1000;

    const user = await User.create({ ...req.body, password: hashPassword, confirmOTP, otpDate });

    try {
        await sendEmail(email, 'Confirm your Email', '', `Your OTP is: ${OTP}`);
    } catch {
        await User.findByIdAndDelete(user._id);
        return next(new AppError(503, 'Could not send confirmation email. Check email configuration and try again.'));
    }

    res.status(200).json({
        success: true,
        message: 'User registered successfully',
        data: user
    });
});


exports.confirmOTP = catchAsync(async (req, res, next) => {
    const { email, confirmOTP } = req.body;
    const findUser = await User.findOne({ email });

    if (!findUser) {
        return next(new AppError(400, 'User not found'));
    }

    if (findUser.isConfirmed) {
        return next(new AppError(400, 'User is already confirmed'));
    }

    const check = await bcrypt.compare(confirmOTP, findUser.confirmOTP);

    if (!findUser || findUser.otpDate < Date.now() || !check) {
        return next(new AppError(400, 'Invalid OTP or expired OTP'));
    }

    findUser.isConfirmed = true;
    findUser.confirmOTP = undefined;
    findUser.otpDate = undefined;

    await findUser.save();
    res.status(200).json({
        success: true,
        message: 'User confirmed successfully',
        data: findUser
    });
});

exports.logIn = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (!findUser) {
        return next(new AppError(400, 'User not found'));
    }

    if (!findUser.isConfirmed) {
        return next(new AppError(400, 'This Email is not confirmed'));
    }

    const check = await bcrypt.compare(password, findUser.password);

    if (!check) {
        return next(new AppError(400, 'Invalid password'));
    }

    const token = await jwtSign(
        {
            _id: findUser._id,
            role: findUser.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        token,
        data: findUser
    });
});

exports.forgetPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
        return next(new AppError(400, 'User not found'));
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    findUser.resetToken = resetToken;
    findUser.resetDate = Date.now() + 10 * 60 * 1000;
    await findUser.save();
    const link = `http://localhost:3000/auth/reset-password/${resetToken}`;
    await sendEmail(email, 'Reset Password', '', `Your reset token at link: ${link}`);
    res.status(200).json({
        success: true,
        message: 'Reset password link sent successfully',
    });
});


exports.resetPassword = catchAsync(async (req, res, next) => {
    const { token } = req.params;
    const { password } = req.body;
    const findUser = await User.findOne({ resetToken: token, resetDate: { $gte: Date.now() } });
    if (!findUser) {
        return next(new AppError(400, 'Invalid link'));
    }
    if (password.length <= 6) {
        return next(new AppError(400, 'Password must be at least 6 characters'));
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);
    findUser.password = hashPassword;
    findUser.resetToken = null;
    findUser.resetDate = null;
    await findUser.save();
    res.status(200).json({
        success: true,
        message: 'Password reset successfully',
    });
});

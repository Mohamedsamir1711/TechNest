const router = require('express').Router();
const user = require('../controller/auth');

router.route('/signup').post(user.signUp);
router.route('/confirm-email').post(user.confirmOTP);
router.route('/login').post(user.logIn);
router.route('/forget-password').post(user.forgetPassword);
router.route('/reset-password/:token').post(user.resetPassword);

module.exports = router;
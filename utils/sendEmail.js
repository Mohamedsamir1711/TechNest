const nodemailer = require('nodemailer');

const createTransporter = () =>
    nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER?.trim(),
            pass: process.env.EMAIL_PASS?.trim(),
        },
    });

exports.sendEmail = async (to, subject, html = '', text = '') => {
    const transporter = createTransporter();
    const mailOptions = {
        from: (process.env.EMAIL_FROM || process.env.EMAIL_USER)?.trim(),
        to,
        subject,
        ...(html && { html }),
        ...(text && { text }),
    };
    await transporter.sendMail(mailOptions);
};

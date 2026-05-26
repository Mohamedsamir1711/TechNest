const dotenv = require('dotenv');
dotenv.config();

const app = require('./app.js');
app.set('query parser', 'extended');
const connectDB = require('./config/connectDB.js');
const chalk = require('chalk');

// 1. الاتصال بقاعدة البيانات بشكل مباشر
connectDB();

// 2. تصدير التطبيق ليتمكن Vercel من قراءته (هذا السطر يحل المشكلة!)
module.exports = app;

// 3. منع تشغيل app.listen على Vercel وتشغيله فقط على جهازك المحلي
const PORT = process.env.PORT || 8000;

// Vercel لا يستخدم وضع الـ development، لذلك سيعمل هذا فقط على جهازك
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(chalk.green(`Server is running on port ${PORT}`));
        console.log(chalk.blue.underline(`http://localhost:${PORT}`));
    });
}
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app.js');
app.set('query parser', 'extended');
const connectDB = require('./config/connectDB.js');
const chalk = require('chalk');

connectDB();

module.exports = app;

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(chalk.green(`Server is running on port ${PORT}`));
        console.log(chalk.blue.underline(`http://localhost:${PORT}`));
    });
}
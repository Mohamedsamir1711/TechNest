const dotenv = require('dotenv');
dotenv.config();

const app = require('./app.js');
app.set('query parser', 'extended');
const connectDB = require('./config/connectDB.js');
const chalk = require('chalk');

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(chalk.green(`Server is running on port ${PORT}`));
    console.log(chalk.blue.underline(`http://localhost:${PORT}`));
    console.log(chalk.yellow.bold(`Environment: ${process.env.NODE_ENV}`));
  });
};

startServer();

const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log(chalk.green(`MongoDB Connected: ${conn.connection.host}`));
    console.log(chalk.blue(`Database Name: ${conn.connection.name}`));

    try {
      await mongoose.connection.collection('users').dropIndex('name_1');
      console.log(chalk.yellow('Removed legacy users.name_1 index'));
    } catch (dropErr) {
      if (dropErr.code !== 27) {
        console.warn(chalk.yellow(`Legacy index cleanup: ${dropErr.message}`));
      }
    }

} catch (error) {
    console.error(chalk.red(`Error connecting to MongoDB: ${error.message}`));
    process.exit(1);
  }
};

module.exports = connectDB;

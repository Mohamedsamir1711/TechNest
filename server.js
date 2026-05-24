const dotenv = require('dotenv');
const app = require('./app.js');
app.set('query parser','extended');
const connectDB = require('./config/connectDB.js');
const chalk = require('chalk');
const cors = require('cors');
app.use(cors({ origin: 'https://Mohamedsamir1711.github.io' })); 

dotenv.config();

const cors = require('cors');
app.use(cors({ origin: 'https://<your-username>.github.io' })); 


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(chalk.green(`Server is running on port ${PORT}`));
  console.log(chalk.blue.underline(`http://localhost:${PORT}`));
  console.log(chalk.yellow.bold(`Environment: ${process.env.NODE_ENV}`));
});

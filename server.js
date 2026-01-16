const express = require('express');
const connectDB = require('./config/db');

// Connect Database
connectDB();
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
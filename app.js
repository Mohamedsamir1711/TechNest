const express = require('express');
const app = express();
const morgan = require('morgan');
productRoutes = require('./routes/products');
userRoutes = require('./routes/user');
const globalError = require('./middlewares/globalError');
const authRoutes = require('./routes/auth');
const authMiddle = require('./middlewares/auth');
const restircTo = require('./middlewares/restircTo');
const expressSan = require('express-mongo-sanitize');
const expressLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

const limiter = expressLimit({
    limit: 30,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests, try again in an hour'
});

app.use(express.json());
app.use(morgan('dev'));
app.use(expressSan());
app.use(limiter);
app.use(helmet());
app.use(cors({origin: 'http://localhost:4200'}));

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the E-commerce API',
    });
});

app.use('/products', productRoutes);
app.use('/user',authMiddle, restircTo("admin"),  userRoutes);
app.use('/auth', authRoutes);

app.use('/', (req, res, next) => {
    res.status(404).send('Page Not Found');
});

app.use(globalError);

module.exports = app;


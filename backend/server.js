// imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const mainCategoryRoute = require('./routes/menu/mainCategory');
const authRoutes = require('./routes/authRoutes');
const { requireAuth } = require('./middlewares/authMiddleware');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
app.use(express.json());
app.use(cors({origin: true, credentials: true}));
app.use(cookieParser());

require('dotenv').config();

// set PORT
const PORT = process.env.PORT || 5000;

// connect to database
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Successfully connected to MongoDB database!");

    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`);
    });

});

connection.on('error', err => {
    console.error('connection error: ', err);
});

app.use('/resources',express.static(__dirname + '/images'));

app.use('/main-category', mainCategoryRoute);

app.use('/cart', requireAuth, cartRoutes);

app.use(authRoutes);

app.get('/check-auth', requireAuth, (req, res) => {
    res.status(200).json({
        isAuthenticated: true
    });
});

app.get('/', (req, res) => {
    console.log(__dirname);
    console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
    res.send('Hello from server!');
});

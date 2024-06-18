const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { connection } = require('./connection/connection');


dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const signupRouter = require('./Routes/Signup');
const signinRouter = require('./Routes/Login');
const productRouter = require('./Routes/products');

app.use('/api/signup', signupRouter);
app.use('/api/signin', signinRouter);
app.use('/api/products', productRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;

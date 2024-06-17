const express = require('express');
const app = express();
const CORS = require('cors');
const router = express.Router();
app.use(CORS());
require('dotenv').config();
app.use(express.json());
const { connection } = require('./connection/connection')


const PORT = process.env.PORT || 3000;


const signupRouter= require('./Routes/Signup');
const signinRouter = require('./Routes/Login');
const productRouter = require('./Routes/products');



app.use('/api/signup', signupRouter);
app.use('/api/signin', signinRouter);
app.use('/api/products', productRouter);

app.get("/" , (req , res)=>{
    try {
        res.status(200).send("This is Home Page");
    } catch (error) {
        console.log(error.message);
    }
})


app.listen( PORT , ()=>{
    try {
            console.log(`connection started on ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {userModule} = require('../connection/connection')

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const user = await userModule.findOne({email:data.email});
        if(!user || !(await bcrypt.compare(data.password , user.password))){
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({id : user.id} , process.env.key);
        res.status(200).json({token , user});
        console.log("Login Done")
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;

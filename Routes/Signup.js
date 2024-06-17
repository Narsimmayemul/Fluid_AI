const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { userModule } = require('../connection/connection');
require('dotenv').config();

router.post('/', async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Username, password, and email are required' });
    }

    try {
        const existingUser = await userModule.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
     
        const newUser = await userModule.create({
            username,
            password: hashedPassword,
            email
        });
        res.status(200).send("User Created:"+newUser)
        
    } catch (error) {
        console.error('Error Creating User:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

module.exports = router;

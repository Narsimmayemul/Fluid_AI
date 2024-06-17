const jwt = require('jsonwebtoken');
require('dotenv').config();
const { userModule } = require('../connection/connection');

module.exports = async (req , res , next)=>{
    const authHeader = req.header('Authorization');
    if(!authHeader){
        res.status(401).send('Authentication Header is Missing');
        }

    const token = authHeader.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token , process.env.key);
        const user = await userModule.findOne(decoded._id);
        if(!user){
            throw new Error();
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send(`Please Authenticate : ${error.message}`)
    }
}

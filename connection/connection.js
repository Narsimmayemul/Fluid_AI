require('dotenv').config();
const mongoose = require('mongoose');

const connection = mongoose.connect(process.env.mongooseURL);

const userSchema = mongoose.Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});


const ProductSchema = mongoose.Schema({
    id : {type:String , required:true},
    title : {type : String , required:true},
    description : {type:String , required:true},
    duedate : {type:String , required:true},
    priority : {type :String , required:true},
    status: {type:String , required:true},
})

const ProductModule = mongoose.model('Products' , ProductSchema);
const userModule = mongoose.model('User' , userSchema);


module.exports = {userModule , connection , ProductModule}
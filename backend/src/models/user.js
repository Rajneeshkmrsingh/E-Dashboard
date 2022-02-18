const mongoose = require("mongoose");

const userSchema =  new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:Number,
    date:{
        type:Date,
        default:Date.now()
    }

})

const user = mongoose.model("user",userSchema);

module.exports = user;

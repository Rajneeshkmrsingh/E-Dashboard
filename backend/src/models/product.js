const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:String,
    category:String,
    price:Number,
    userId:String,
    company:String,
    date:{
        type:Date,
        default:Date.now()
    }
});

const products = mongoose.model("products",productSchema);
module.exports =products;
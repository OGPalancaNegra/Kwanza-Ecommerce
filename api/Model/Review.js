const mongoose = require("mongoose")
/* 
const Client = require("../Model/Client")
const Product = require("../Model/Product") */

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    clientId: {
        type: mongoose.Types.ObjectId,
        ref: "client"
    }
}, {timestamps:true})


module.exports = mongoose.model("review", reviewSchema)
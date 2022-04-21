const mongoose = require("mongoose")

const orderSchema  = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, {timestamps: true})


module.exports = mongoose.model("order",orderSchema)
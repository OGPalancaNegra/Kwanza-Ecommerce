const mongoose = require("mongoose")


const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashedPass: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        required: false,
        },
    }, 
    {timestamps: true})


module.exports = mongoose.model("Admin",adminSchema)
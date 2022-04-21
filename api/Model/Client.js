const mongoose = require("mongoose")
//const passportLocalMongoose = require("passport-local-mongoose")

const ClientSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    hashedP: {
        type: String,
        required: true
    },
    recieveEmail: {
        type: Boolean,
        required: true,
        default: false
    }
},{timestamps: true})


//ClientSchema.plugin(passportLocalMongoose)


module.exports = mongoose.model("client", ClientSchema)
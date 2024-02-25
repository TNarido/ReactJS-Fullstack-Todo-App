const mongoose = require("mongoose")

//User Schema

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Add your fuckin' name you peace of shit!"]
    },
    email : {
        type : String,
        required : [true, "Where the fuck's your email?"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "You forgot to put your password idiot!"]
    }
}, {timestamps : true})

module.exports = mongoose.model('users', UserSchema)
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({    
    name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        min: 1,
        max: 1,
        required: true
        // default: "Users",
    },
    emailverificationToken: {
        type: String,
        default: "",
    },
    verified: {
        type: Boolean,
        default: false
    },
})
module.exports = mongoose.model('User', userSchema)
const mongoose = require('mongoose')
const googleuserSchema = new mongoose.Schema({    
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: ""
    },
    role: {
        type: Number,
        required: true
    },
})
module.exports = mongoose.model('GoogleUser', googleuserSchema)
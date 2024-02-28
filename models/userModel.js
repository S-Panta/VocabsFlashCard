const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        lowercase: true, 
        required: true, 
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        index: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
      }
})

const User  = new mongoose.model('user',userSchema)
module.exports = User
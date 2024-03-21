const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please enter valid username ']
  },

  email: {
    type: String,
    lowercase: true,
    required: [true, 'Please enter an email'],
    index: true,
    unique: true,
    validate: [isEmail, 'Please enter a valid email']
  },

  password: {
    type: String,
    required: [true, 'Password cannot be empty'],
    minlength: [6, 'Password should be minimum of 6 digits character']
  }
})

// Do not use arrow functions for mongoose getters/setters.
userSchema.pre('save', async function (next) {
  const workFactor = 8
  const salt = await bcrypt.genSalt(workFactor)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Eslint disabled to fix this message
// A constructor name should not start with a lowercase letter
// eslint-disable-next-line new-cap
const User = new mongoose.model('user', userSchema)
module.exports = User

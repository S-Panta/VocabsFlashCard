const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
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

// user defined method

// userSchema.statics.login = async (email, password) => {
//   const user = await this.findOne({ email })
//   if (user) {
//     const auth = await bcrypt.compare(password, user.password)
//     if (auth) {
//       return user
//     }
//     throw Error('incorrect password')
//   }
//   throw Error('Email not registered')
// }

// eslint-disable-next-line new-cap
const User = new mongoose.model('user', userSchema)
module.exports = User

const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secretKey = 'f4568a2e06b0158bd954a8da2a62d8d0d98244077af7aa19e3784ef501277683'

const authenticateMiddleware = (req, res, next) => {
  const token = req.headers.authorization
  console.log(token)
  if (!token) {
    return res.status(401).send('Access Denied.')
  }
  try {
    req.user = jwt.verify(token, secretKey)
    next()
  } catch (error) {
    res.status(400).send('Invalid Token.')
    res.redirect('/login')
  }
}

const getUser = (req, res) => {
  console.log(req.headers)
}

const getErrorMessage = (error) => {
  const errors = { }
  // signup validation
  if (error.name === 'ValidationError') {
    const errorMessages = Object.values(error.errors).map(value => value.properties)
    errorMessages.forEach((value) => {
      errors[value.path] = value.message
    })
  }
  // Duplicate Key Error
  if (error.code === 11000) {
    errors.message = 'User is already registered'
  }
  return errors
}

const generateToken = (user) => {
  return jwt.sign({ user }, secretKey, { expiresIn: '1h' })
}
const getLoginPage = (req, res) => {
  res.send('login page  is on')
}

const authenticateUser = async (req, res) => {
  const { email, password } = req.body
  const validateUser = await User.findOne({ email })
  if (validateUser) {
    const validatePassword = await bcrypt.compare(password, validateUser.password)
    if (validatePassword) {
      const token = generateToken(validateUser._id)
      res.header('Authorization', token).send({ Authorization: token })
    } else {
      res.status(401).json({ error: 'Password mismatch' })
    }
  } else {
    res.status(401).json({ error: 'Email not registered' })
  }
}

const getSignUpPage = (req, res) => {
  res.send("You're  in signup page")
}

const registerNewUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.create({
      email: email,
      password: password
    })
    res.status(201).json(user)
  } catch (err) {
    console.log(err)
    res.status(403).json(getErrorMessage(err))
  }
}

module.exports = {
  getLoginPage,
  authenticateUser,
  getSignUpPage,
  registerNewUser,
  authenticateMiddleware,
  getUser
}

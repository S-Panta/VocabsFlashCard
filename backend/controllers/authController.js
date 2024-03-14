const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.SECRET_KEY

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

/**
 * @swagger
 * /api/login:
 *   post:
 *     description: login user
 *     responses:
 *       200:
 *         description: Authorization token
 */
const authenticateUser = async (req, res) => {
  const { username, password } = req.body
  const validateUser = await User.findOne({ username })
  if (validateUser) {
    const validatePassword = await bcrypt.compare(password, validateUser.password)
    if (validatePassword) {
      const token = generateToken(validateUser._id)
      res.header('Authorization', token).send({ Authorization: token })
      // console.log(res.get('Authorization'))
    } else {
      res.status(401).json({ error: 'Password mismatch' })
    }
  } else {
    res.status(401).json({ error: 'User not registered' })
  }
}

/**
 * @swagger
 * /api/signup:
 *   post:
 *     description: signup new user
 *     responses:
 *       201:
 *         description: Created
 */
const registerNewUser = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const user = await User.create({
      username,
      email,
      password
    })
    res.status(201).json(user)
  } catch (err) {
    res.status(403).json(getErrorMessage(err))
  }
}

module.exports = {
  authenticateUser,
  registerNewUser
}

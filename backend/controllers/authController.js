const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.SECRET_KEY

const getErrorMessage = (error) => {
  const errors = { }
  if (error.name === 'ValidationError') {
    const errorMessages = Object.values(error.errors).map(value => value.properties)
    errorMessages.forEach((value) => {
      errors[value.path] = value.message
    })
  }
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
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *
 * /api/login:
 *   post:
 *     summary: Authenticate and login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Authorization:
 *                   type: string
 *                   description: JWT token for authorization
 *       '401':
 *         description: UnAuthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
 * components:
 *   schemas:
 *     NewUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with username, email, and password.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewUser'
 *       '403':
 *         description: Error creating user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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

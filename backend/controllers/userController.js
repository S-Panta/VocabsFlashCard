const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const FlashCard = require('../models/flashCardModel')
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

const generateToken = (userId, userRole) => {
  return jwt.sign({ userId, userRole }, secretKey, { expiresIn: '1h' })
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
 *     tags:
 *       - User
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
      const token = generateToken(validateUser._id, validateUser.role)
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
 *         role:
 *            type: string
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Register new user with username, email, password and role.
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
  const { username, email, password, role } = req.body
  try {
    const user = await User.create({
      username,
      email,
      password,
      role
    })
    res.status(201).json(user)
  } catch (err) {
    res.status(403).json(getErrorMessage(err))
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     CreatedUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         username:
 *           type: string
 *         role:
 *            type: string
 * /api/admin/users:
 *   get:
 *     summary: Return list of users
 *     description: Return list of  user with username, email and role.
 *     tags:
 *       - Admin
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreatedUser'
 *       '500':
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

const getAllUsers = async (req, res) => {
  try {
    // exclude admin users
    const response = await User.find({ role: { $ne: 'admin' } }).select('username email role')
    res.status(200).json(response)
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

/**
 * @swagger
 * /api/admin/users/{username}:
 *   get:
 *     summary: Return a user
 *     description: Return user with username, email,and role.
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the user to retrieve
 *     tags:
 *       - Admin
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreatedUser'
 *       '500':
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

const getUserByName = async (req, res) => {
  const userName = req.params.username
  try {
    const response = await User.findOne({ username: userName }).select('username email role')
    if (!response) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(response)
  } catch (err) {
    res.status(401).json({ error: 'User not found' })
  }
}

/**
 * @swagger
 * /api/admin/users/{username}:
 *   delete:
 *     summary: Delete a user by it's username
 *     description: Delete a user.
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the user to delete
 *     tags:
 *       - Admin
 *     responses:
 *       '204':
 *         content:
 *           application/json:
 *             schema:
 *       '500':
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const deleteUser = async (req, res) => {
  const userName = req.params.username
  console.log(userName)
  try {
    const response = await User.findOneAndDelete({ username: userName })
    if (!response) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(204).json({ message: 'User deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  authenticateUser,
  registerNewUser,
  getAllUsers,
  getUserByName,
  deleteUser
}

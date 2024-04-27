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
const getEmptyErrorMessage = (username,password) =>{
  if(!username){
    return "Username cannot be empty"
  }
  if(!password){
    return "Password cannot be empty"
  }
}
const generateToken = (userId, userRole) => {
  return jwt.sign({ userId, userRole }, secretKey, { expiresIn: '1h' })
}

const authenticateUser = async (req, res) => {
  const { username, password } = req.body
  try{
    if(!username || !password){
      throw new Error(getEmptyErrorMessage(username,password))
    }
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
  } catch (error){
    res.status(400).json({error: error.message})
  }
}

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

const getAllUsers = async (req, res) => {
  try {
    // exclude admin users
    const response = await User.find({ role: { $ne: 'admin' } }).select('username email role')
    res.status(200).json(response)
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

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

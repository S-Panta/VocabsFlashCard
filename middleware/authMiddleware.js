const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const secretKey = 'f4568a2e06b0158bd954a8da2a62d8d0d98244077af7aa19e3784ef501277683'
const authenticateMiddleware = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).send('Access Denied.')
  }
  try {
    req.user = jwt.verify(token, secretKey)
    next()
  } catch (error) {
    return res.status(400).send('Invalid Token.')
  }
}

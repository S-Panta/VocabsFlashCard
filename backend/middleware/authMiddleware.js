const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.SECRET_KEY
const authenticateMiddleware = (req, res, next) => {
  // when passing token as Bearer
  const token = req.headers.authorization.split(' ')[1]
  if (!token) {
    return res.status(401).send('Access Denied.')
  } else {
    try {
      const decoded = jwt.verify(token, secretKey)
      req.user = decoded.user
      next()
    } catch (error) {
      // console.log(error)
      res.status(400).send('Invalid Token.')
    }
  }
}
const checkAuthMiddleWare = (req, res) => {
  res.sendStatus(200).send('User found')
}

module.exports = {
  authenticateMiddleware,
  checkAuthMiddleWare
}

const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.SECRET_KEY
const authenticateMiddleware = (req, res, next) => {
  // when passing token as Bearer
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing or invalid' })
  }
  const token = authHeader.split(' ')[1]
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

const checkAdminMiddleWare = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing or invalid' })
  }
  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).send('Unauthorized')
  } else {
    try {
      const decoded = jwt.verify(token, secretKey)
      if (decoded.userRole === 'admin') { next() } else { res.status(400).send('UnAuthorized Route') }
    } catch (error) {
      res.status(400).send('Invalid Token.')
    }
  }
}

module.exports = {
  authenticateMiddleware,
  checkAdminMiddleWare
}

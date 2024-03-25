const { Router } = require('express')
const { authenticateUser, registerNewUser } = require('../controllers/authController')
const { authenticateMiddleware} = require('../middleware/authMiddleware')
const router = Router()

router.post('/api/login', authenticateUser)
router.post('/api/signup', registerNewUser)

module.exports = router

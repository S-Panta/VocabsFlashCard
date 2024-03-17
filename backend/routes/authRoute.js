const { Router } = require('express')
const { authenticateUser, registerNewUser } = require('../controllers/authController')
const { authenticateMiddleware, checkAuthMiddleWare } = require('../middleware/authMiddleware')
const router = Router()

router.post('/api/login', authenticateUser)
router.post('/api/signup', registerNewUser)

// route for checking authenticateMiddleware
router.get('/user', authenticateMiddleware, checkAuthMiddleWare)

module.exports = router

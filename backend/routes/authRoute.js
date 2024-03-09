const { Router } = require('express')
const authController = require('../controllers/authController')
const authMiddleWare = require('../middleware/authMiddleware')
const router = Router()

router.post('/api/login', authController.authenticateUser)
router.post('/api/signup', authController.registerNewUser)

// route for checking authenticateMiddleware
router.get('/user', authMiddleWare.authenticateMiddleware, authMiddleWare.checkAuthMiddleWare)

module.exports = router

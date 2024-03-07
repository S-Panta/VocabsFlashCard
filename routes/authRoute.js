const { Router } = require('express')
const authController = require('../controllers/authController')
const authMiddleWare = require('../middleware/authMiddleware')
const router = Router()

router.get('/login', authController.getLoginPage)
router.get('/signup', authController.getSignUpPage)
router.post('/login', authController.authenticateUser)
router.post('/signup', authController.registerNewUser)

// route for checking authenticateMiddleware
router.get('/user', authMiddleWare.authenticateMiddleware, authMiddleWare.checkAuthMiddleWare)

module.exports = router

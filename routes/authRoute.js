const {Router} = require('express')
const authController = require('../controllers/authController')
const router = Router()

router.get('/login',authController.getLoginPage)
router.get('/signup',authController.getSignUpPage)
router.post('/login',authController.authenticateUser)
router.post('/signup',authController.registerNewUser)

module.exports = router  
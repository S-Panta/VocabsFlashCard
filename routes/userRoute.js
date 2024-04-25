const { Router } = require('express')
const { getLoginPage,getSignupPage} = require('../controllers/viewsController')
const { authenticateUser, registerNewUser, getAllUsers, getUserByName, deleteUser } = require('../controllers/userController')
const { authenticateMiddleware, checkAdminMiddleWare } = require('../middleware/authMiddleware')
const router = Router()


router.post('/api/login', authenticateUser)
router.post('/api/signup', registerNewUser)

// routes related to admin and user
router.get('/api/admin/users', authenticateMiddleware, checkAdminMiddleWare, getAllUsers)
router.get('/api/admin/users/:username', authenticateMiddleware, checkAdminMiddleWare, getUserByName)
router.delete('/api/admin/users/:username', authenticateMiddleware, checkAdminMiddleWare, deleteUser)
module.exports = router

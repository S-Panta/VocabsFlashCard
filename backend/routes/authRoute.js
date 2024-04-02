const { Router } = require('express')
const { authenticateUser, registerNewUser, getAllUsers } = require('../controllers/userController')
const { authenticateMiddleware, checkAdminMiddleWare } = require('../middleware/authMiddleware')
const router = Router()

router.post('/api/login', authenticateUser)
router.post('/api/signup', registerNewUser)

// routes related to admin and user
router.get('/api/admin/users',
  authenticateMiddleware,
  checkAdminMiddleWare,
  getAllUsers
)
module.exports = router

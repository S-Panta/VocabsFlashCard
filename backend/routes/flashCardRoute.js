const { Router } = require('express')
const router = Router()
const { authenticateMiddleware,checkAdminMiddleWare } = require('../middleware/authMiddleware')
const { updateStatusToFlashCard, getFlashCard,getAllFlashCards } = require('../controllers/flashCardController')

router.get('/api/flashcards/:id', authenticateMiddleware, getFlashCard)
router.get('/api/flashcards',authenticateMiddleware, getAllFlashCards)
router.put('/api/flashcards/:id/update', authenticateMiddleware, updateStatusToFlashCard)

//flashcard routes for admin user
// create new flashcard, delete flashcard, update flashcard, get
router.get('/api/admin/flashcards',authenticateMiddleware,checkAdminMiddleWare,getAllFlashCards)
// router.post('/api/admin/')

module.exports = router

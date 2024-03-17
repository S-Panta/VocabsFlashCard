const { Router } = require('express')
const router = Router()
const { authenticateMiddleware } = require('../middleware/authMiddleware')
const { updateStatusToFlashCard, getFlashCards } = require('../controllers/flashCardController')

router.get('/api/flashcards/:id', authenticateMiddleware, getFlashCards)
router.put('/api/flashcards/:id/update', authenticateMiddleware, updateStatusToFlashCard)

module.exports = router

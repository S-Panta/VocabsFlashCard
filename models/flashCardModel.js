const mongoose = require('mongoose')

const flashCardSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  word: { type: String, required: true },
  meaning: { type: String, required: true },
  sentence: { type: String, required: true },
  reference: { type: String, required: true },
  reviewStatus: {
    type: String,
    enum: ['NotReviewed', 'Reviewed', 'Mastered'],
    default: 'NotReviewed'
  }
})

// eslint-disable-next-line new-cap
const FlashCard = new mongoose.model('vocabulary', flashCardSchema)
module.exports = FlashCard

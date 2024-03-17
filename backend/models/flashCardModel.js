const mongoose = require('mongoose')

const flashCardModel = new mongoose.Schema({
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
const FlashCardModel = new mongoose.model('vocabulary', flashCardModel)
module.exports = FlashCardModel

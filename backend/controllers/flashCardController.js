const FlashCard = require('../models/flashCardModel')

// update status of flashCard
const updateStatusToFlashCard = async (req, res) => {
  const flashCardId = req.params.id
  const { reviewStatus } = req.body
  try {
    await FlashCard.findOneAndUpdate(
      { id: flashCardId },
      { reviewStatus }, {
        new: true
      })
    res.status(200).send('Status updated Successfully')
  } catch (err) {
    res.status(401).json({ error: 'Request failed' })
  }
}

// get flashcard by id
const getFlashCard = async (req, res) => {
  const flashCardId = req.params.id
  try {
    const flashCard = await FlashCard.findOne({ id: flashCardId })
    res.status(200).json(flashCard)
  } catch (err) {
    res.status(401).json({ error: 'Item not found' })
  }
}

const getAllFlashCards = async(req,res) =>{
  try{
    const flashCards = await FlashCard.find({})
    res.status(200).json(flashCards)
  } catch(err){
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
module.exports = { updateStatusToFlashCard, getFlashCard ,getAllFlashCards}

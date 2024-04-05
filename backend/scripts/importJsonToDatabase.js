const fs = require('fs')
const path = require('path')
const FlashCardModel = require('../models/flashCardModel')
const filePath = path.join(__dirname, 'vocabs.json')
require('dotenv').config()
const dbURI = process.env.dbURI
const mongoose = require('mongoose')

mongoose.connect(dbURI)
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => {
    console.log(err)
  })

const vocabularyData = JSON.parse(fs.readFileSync(filePath, 'utf8'))

for (const data of vocabularyData.Vocabulary) {
  const { id, word, meaning, sentence, reference } = data
  const writeToServer = async () => {
    try {
      const response = await FlashCardModel.create({
        id,
        word,
        meaning,
        sentence,
        reference
      })
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
  writeToServer()
}

// (async () => {
//   await uploadFileToMongodb()
// })()

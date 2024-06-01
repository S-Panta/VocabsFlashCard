const fs = require('fs')
const path = require('path')
const FlashCardModel = require('../models/flashCardModel')
const filePath = path.join(__dirname, 'list-1.json')

require('dotenv').config()
const dbURI = process.env.dbURI
const mongoose = require('mongoose')

mongoose.connect(dbURI)
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => {
    throw Error(err)
  })

const vocabularyData = JSON.parse(fs.readFileSync(filePath, 'utf8'))
console.log(vocabularyData.Vocabulary.length)
const VocabsList = vocabularyData.Vocabulary

const writeToServer = async () => {
    try {
        for(let i = 0;i<VocabsList.length;i++){
            const [word, meaning, sentence, reference ] = VocabsList[i]
            await FlashCardModel.create({
                id: i + 1,
                word,
                meaning,
                sentence,
                reference
            })
        }
    } catch (err){
        throw Error(err)
    } finally {
        mongoose.connection.close()
    }
}
writeToServer()


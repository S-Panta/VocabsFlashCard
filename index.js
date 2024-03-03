const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoute')
const app = express()

const port = 3000
const dbURI = 'mongodb://127.0.0.1:27017/user'

// set the view engine to ejs
app.set('view engine', 'ejs')

// middlewares
app.use(express.json())
app.use(authRoute)

app.get('/home', (req, res) => {
  res.send('Hello World')
})

mongoose.connect(dbURI)
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => console.log(err))

app.use('/static', express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

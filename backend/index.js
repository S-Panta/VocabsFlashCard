const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoute')
const app = express()

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const port = process.env.PORT

const dbURI = `mongodb+srv://${username}:${password}@cluster0.y1mqked.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// application-level middleware : instance of the app object
app.use(express.json())
app.use(authRoute)

// connect to database
mongoose.connect(dbURI)
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => {
    console.log(dbURI)
    console.log(err)
  })

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

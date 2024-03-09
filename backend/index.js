const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoute')
const app = express()
const cors = require('cors')

const port = process.env.PORT
const dbURI = process.env.dbURI

// application-level middleware : instance of the app object
app.use(express.json())
app.use(authRoute)
app.use(cors())
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

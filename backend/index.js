const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoute')
const swaggerUi = require('swagger-ui-express')
const specs = require('./swagger')
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT
const dbURI = process.env.dbURI

const app = express()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use(express.json())
app.use(authRoute)
app.use(cors())

mongoose.connect(dbURI)
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => {
    console.log(err)
  })

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

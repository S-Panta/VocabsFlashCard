const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoute = require('./routes/authRoute')
const swaggerUi = require('swagger-ui-express')
const specs = require('./swagger')

require('dotenv').config()

const port = process.env.PORT
const dbURI = process.env.dbURI

const app = express()
// series of middleware used in this app
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use(express.json())
app.use(authRoute)

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

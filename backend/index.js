const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoute = require('./routes/userRoute')
const flashCardRoute = require('./routes/flashCardRoute')
const swaggerUi = require('swagger-ui-express')
const fs = require("fs")
const YAML = require('yaml')

const file  = fs.readFileSync("./docs/swagger.yaml", 'utf8')
const swaggerDocument = YAML.parse(file)
require('dotenv').config()

const port = process.env.PORT
const dbURI = process.env.dbURI

const app = express()
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json())
app.use(authRoute)
app.use(flashCardRoute)

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

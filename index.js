const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const viewRoute = require('./routes/viewRoute')
const authRoute = require('./routes/userRoute')
const flashCardRoute = require('./routes/flashCardRoute')
const swaggerUi = require('swagger-ui-express')
const specs = require('./swagger')
const path = require('path')
require('dotenv').config()

const port = process.env.PORT
const dbURI = process.env.dbURI

const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(viewRoute)
app.use(authRoute)
app.use(flashCardRoute)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

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

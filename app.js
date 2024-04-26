const express = require('express')
const path = require('path')
const authRoute = require('./routes/userRoute')
const flashCardRoute = require('./routes/flashCardRoute')
const swaggerUi = require('swagger-ui-express')
const fs = require("fs")
const YAML = require('yaml')
require('dotenv').config()

const app = express()


//swagger docs
const filePath = path.join(process.cwd(), 'docs', 'swagger.yaml');
const file  = fs.readFileSync(filePath, 'utf8')
const swaggerDocument = YAML.parse(file)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json())

//middleware for routes
app.use(authRoute)
app.use(flashCardRoute)

module.exports = app
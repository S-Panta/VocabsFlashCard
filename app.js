const express = require('express')
const path = require('path')
const authRoute = require('./routes/userRoute')
const flashCardRoute = require('./routes/flashCardRoute')
const swaggerUi = require('swagger-ui-express')
const fs = require("fs")
const YAML = require('yaml')
const cors = require('cors');
require('dotenv').config()

const app = express()


//swagger docs
const filePath = path.join(process.cwd(), 'docs', 'swagger.yaml');
const file  = fs.readFileSync(filePath, 'utf8')
const swaggerDocument = YAML.parse(file)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json())

// Serve Angular app from 'dist' folder
app.use(express.static('dist/browser'));

app.get(['/login','/home', '/signup'], (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/browser', 'index.html'));
});

//middleware for routes
app.use(cors())
app.use(authRoute)
app.use(flashCardRoute)

module.exports = app
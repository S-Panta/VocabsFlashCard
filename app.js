const express = require('express')
const path = require('path')
const cors = require('cors')
const authRoute = require('./routes/userRoute')
const flashCardRoute = require('./routes/flashCardRoute')
const swaggerUi = require('swagger-ui-express')
const fs = require("fs")
const YAML = require('yaml')
require('dotenv').config()

const file  = fs.readFileSync("./docs/swagger.yaml", 'utf8')
const swaggerDocument = YAML.parse(file)

const app = express()
//serving static file
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')
app.get('/login', (req, res) => {
    res.render('login'); // Renders the login.ejs file
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json())
app.use(authRoute)
app.use(flashCardRoute)

module.exports = app
const app = require('./app')
const mongoose = require("mongoose");

require('dotenv').config()
const port = process.env.PORT
const dbURI = process.env.dbURI

const path = require('path');
const htmlDir = path.join(__dirname, 'views');

mongoose.connect(dbURI)
    .then(() => {
        console.log('Database connected')
    })
    .catch((err) => {
        console.log(err)
    })

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
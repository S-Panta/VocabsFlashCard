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

app.get('/', (req, res) => {
    // Send the HTML file using sendFile()
    res.sendFile(path.join(htmlDir, 'loginPage.html'));
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
const app = require('./app')
const mongoose = require("mongoose");

require('dotenv').config()
const port = process.env.PORT
const dbURI = process.env.dbURI

// Create GET request
app.get("/", (req, res) => {
    res.send("Express on Vercel");
  });
  
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
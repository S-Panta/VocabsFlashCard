const express = require('express');
const path = require('path');
const app = express();
const port = 3000

//using the routes
const authRoute = require('./routes/authRoute')
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.json());

app.get('/home',(req, res)=>{
    res.send("Hello World")
})
// const dbURI = 'mongodb://127.0.0.1:27017/myapp';
// mongoose.connect(dbURI)
//   .then((result) => app.listen(3000))
//   .catch((err) => console.log(err));

// // routes
app.use(authRoute)

app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})
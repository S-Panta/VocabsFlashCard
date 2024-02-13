const express = require('express');
const path = require('path');

const app = express();
const port = 3000

app.get('/home',(req, res)=>{
    res.send("Hello World")
})
// Serve static files from the 'frontend' directory
app.use('/', express.static(path.join(__dirname, '../frontend')));

// Route for rendering index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});
app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})
const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.get('/', (req, res) => {
  // Your SSR logic here
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

module.exports = router

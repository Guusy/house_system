const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello World! Heroku !')
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
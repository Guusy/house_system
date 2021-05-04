const PORT = process.env.PORT || 5000
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const todoItemsRoute = require('./routes/todo-items')

app.use(bodyParser.json());
app.use('/todo-items',todoItemsRoute)


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

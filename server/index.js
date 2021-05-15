const PORT = process.env.PORT || 5000
const path = require('path');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

const todoItemsRoute = require('./routes/todo-items')

app.use(cors());
app.use(bodyParser.json());
app.use('/todo-items', todoItemsRoute)


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

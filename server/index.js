const PORT = process.env.PORT || 5000
const path = require('path');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const buildPath = path.join(__dirname, '..', 'build');


const todoItemsRoute = require('./routes/todo-items')

app.use(cors());
app.use(express.json());
app.use('/api/todo-items', todoItemsRoute)
app.use('/', express.static(buildPath));

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

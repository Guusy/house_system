const PORT = process.env.PORT || 5000
const path = require('path');
const express = require('express')
const cors = require('cors')
const app = express()

const buildPath = path.join(__dirname, '..', 'build');


const todoItemsRoute = require('./routes/todo-items')
const shoppingRoute = require('./routes/shopping')

app.use(cors());
app.use(express.json());
app.use('/api/todo-items', todoItemsRoute)
app.use('/api/shopping', shoppingRoute)
app.use('/', express.static(buildPath));

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

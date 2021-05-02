const express = require('express')
const TaxRepository = require('./repositories/TaxRepository')
const app = express()
const PORT = process.env.PORT || 5000



app.get('/', (req, res) => {
  res.send('Hello World! Heroku !')
})

app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test_table');
    const results = { 'results': (result) ? result.rows : null };
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

app.get('/todo-items', async (req, res) => {
  try {
    const results = await TaxRepository.getAll()
    res.send(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

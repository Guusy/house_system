const express = require('express');
const router = express.Router();
const TaxRepository = require('../repositories/TaxRepository')

router.get('/', async (req, res) => {
    try {
      const results = await TaxRepository.getAll()
      res.send(results);
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

router.post('/tax', async (req, res) => {
    try {
        const results = await TaxRepository.create(req.body)
        res.send(results);
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
})

module.exports = router
const express = require('express');
const ShoppingRepository = require('../repositories/ShoppingRepository');
const router = express.Router();

router.get('/items', async (req, res) => {
  try {
    const results = await ShoppingRepository.getAll()
    res.send(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

router.post('/items', async (req, res) => {
  try {
    const results = await ShoppingRepository.create(req.body)
    res.send(results);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

router.put('/items', async (req, res) => {
    try {
      const results = await ShoppingRepository.update(req.body)
      res.send(results);
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

module.exports = router
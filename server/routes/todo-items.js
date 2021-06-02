const express = require('express');
const router = express.Router();
const TaxRepository = require('../repositories/TaxRepository');
const TodoItemsRepository = require('../repositories/TodoItemsRepository');

router.get('/', async (req, res) => {
  try {
    const taxes = await TaxRepository.getAll()
    res.send({ taxes });
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const results = await TodoItemsRepository.create(req.body)
    res.send(results);
  } catch (err) {
    return next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const results = await TodoItemsRepository.delete(id)
    res.send(results);
  } catch (err) {
    return next(err)
  }
})


router.get('/tax/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const results = await TaxRepository.getById(id)
    res.send(results);
  } catch (err) {
    return next(err)
  }
})

router.delete('/tax/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    await TaxRepository.delete(id)
    res.send({ message: 'The tax was deleted'});
  } catch (err) {
    return next(err)
  }
})

router.put('/tax/:id/pay', async (req, res, next) => {
  const { id } = req.params
  try {
    const results = await TaxRepository.pay(id)
    res.send(results);
  } catch (err) {
    return next(err)
  }
})

router.post('/tax', async (req, res) => {
  try {
    const results = await TaxRepository.create(req.body)
    res.send(results);
  } catch (err) {
    return next(err)
  }
})



module.exports = router
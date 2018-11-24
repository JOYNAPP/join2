<<<<<<< HEAD
const express = require('express')
const router = express.Router()

const db = require('../db')
const {FunEvent} = require('../db/models/index')

// Get all events
router.get('/', async function(req, res, next) {
  try {
    const event = await FunEvent.findAll()
    console.log('All Events!')
    res.status(200).send(event)
  } catch (error) {
    next(error)
  }
})

// Get particular event by their id
router.get('/:id', async function(req, res, next) {
  try {
    const id = req.params.id
    const particularEvent = await FunEvent.findById(id)
    console.log('Particular FunEvent by ID!')
    res.status(200).send(particularEvent)
  } catch (error) {
    next(error)
  }
})

// Create a event
router.post('/', async function(req, res, next) {
  try {
    const newEvent = await FunEvent.create({
      name,
      date,
      ticketPrice
    })
    console.log('Created Event!')
    res.status(201).send({message: 'Made new event! Woo!', newEvent: newEvent})
  } catch (error) {
    next(error)
  }
})

// Update particular event
router.put('/:id', async function(req, res, next) {
  try {
    const eventToUpdate = await FunEvent.findById(req.params.id)
    const updtatedEvent = await eventToUpdate.update({
      name,
      date,
      ticketPrice
    })
    res
      .status(201)
      .send({message: 'updated event! Woo!', updtatedEvent: updtatedEvent})
  } catch (error) {
    next(error)
  }
})
// what is the point of listing out the variable vs req.body? id see any change when post (via postman). tried posting variable not listed and worked. tried not including variables listed and worked... ?.

module.exports = router
=======
const router = require('express').Router()

module.exports = router

>>>>>>> master

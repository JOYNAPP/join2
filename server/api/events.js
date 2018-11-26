const express = require('express')
const router = express.Router()
const {FunEvent} = require('../db/models/index')
const MockResponse = require('./mock-event')

var eventbriteAPI = require('node-eventbrite')
var token = 'AF36NVFKHSLG27TQBBWF'

const api = eventbriteAPI({
  token: token,
  version: 'v3'
})

async function getEvents() {
  var res = await api.search({q: 'join launch ', price: 'free'}, function(
    error,
    data
  ) {
    if (error) {
      // console.log(error.message)
      console.log('ERROR')
      console.log(error.message)
      return MockResponse.slice(0, 1)
    } else return data['events'].slice(0, 1) // Do something with your data!
  })
  return res
}
//const events = getEvents()
//console.log('EVENTS', events.then(event => console.log(event)))

router.get('/', async function(req, res, next) {
  console.log('In the "all events" route!')

  try {
    // const dataBaseEvents = await FunEvent.findAll()
    //const events = await getEvents()
    const events = MockResponse
    // events.pop('text')
    // events.pop('html')
    console.table('eventbrite:', events)
    res.status(200).send(events)
  } catch (error) {
    console.log('error in events.js')
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

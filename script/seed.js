'use strict'

const db = require('../server/db')
const {User, Contract, FunEvent} = require('../server/db/models')
const {green, red} = require('chalk')

const contracts = [
  {
    eventId: 56789,
    fulfilled: false
  },
  {
    eventId: 56790,
    fulfilled: false
  },
  {
    eventId: 56791
  }
]

const funEvents = [
  {
    name: 'Drake Concert',
    date: '01/01/2019',
    ticketPrice: 50
  },
  {
    name: 'Ira Glass',
    date: '01/02/2019',
    ticketPrice: 30
  },
  {
    name: 'Bob Dylan',
    date: '01/03/2019',
    ticketPrice: 100
  },
  {
    name: 'Ricky Martin',
    date: '01/04/2019',
    ticketPrice: 10
  }
]

const users = [
  {
    name: 'Cody',
    email: 'cody@email.com',
    password: '123',
    invitedEvents: [1, 2, 3],
    attendedEvents: [],
    pastEvents: []
  },
  {
    name: 'Maggie',
    email: 'maggie@email.com',
    password: '123',
    invitedEvents: [2, 3, 4],
    attendedEvents: [],
    pastEvents: []
  }
]

const seed = () =>
  Promise.all(contracts.map(elem => Contract.create(elem)))
    .then(() => Promise.all(users.map(elem => User.create(elem))))
    .then(() => Promise.all(funEvents.map(elem => FunEvent.create(elem))))

const main = () => {
  console.log('Syncing the db...')
  db
    .sync({force: true})
    .then(() => {
      console.log(green('Seeding the database...'))
      return seed()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
    })
    .then(() => {
      db.close()
      console.log(green('Seeded Successfully!!'))
      return null
    })

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${contracts.length} contracts`)
  console.log(`seeded ${funEvents.length} events`)
}
main()

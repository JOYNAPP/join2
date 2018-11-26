'use strict'

const db = require('../server/db')
const {User, Contract, FunEvent} = require('../server/db/models')
const {green, red} = require('chalk')

const seed = async () => {
  await db.sync({force: true})

  const cody = await User.create({
    name: 'Cody',
    email: 'cody@email.com',
    password: '123'
  })

  const maggie = await User.create({
    name: 'Maggie',
    email: 'maggie@email.com',
    password: '123'
  })

  const maria = await User.create({
    name: 'Maria',
    email: 'maria@email.com',
    password: '123'
  })

  const liv = await User.create({
    name: 'Liv',
    email: 'liv@email.com',
    password: '123'
  })

  const drake = await FunEvent.create({
    name: 'Drake Concert',
    date: '01/01/2019',
    ticketPrice: 50,
    imgUrl:
      'https://hollywoodstreetking.com/wordpress/wp-content/uploads/2017/03/drake-fans-boycott-concert.jpg'
  })

  const iraGlass = await FunEvent.create({
    name: 'Ira Glass',
    date: '01/02/2019',
    ticketPrice: 30,
    imgUrl:
      'https://hollywoodstreetking.com/wordpress/wp-content/uploads/2017/03/drake-fans-boycott-concert.jpg'
  })

  const bobDylan = await FunEvent.create({
    name: 'Bob Dylan',
    date: '01/03/2019',
    ticketPrice: 100,
    imgUrl:
      'https://hollywoodstreetking.com/wordpress/wp-content/uploads/2017/03/drake-fans-boycott-concert.jpg'
  })

  const rickyMartin = await FunEvent.create({
    name: 'Ricky Martin',
    date: '01/04/2019',
    ticketPrice: 10,
    imgUrl:
      'https://hollywoodstreetking.com/wordpress/wp-content/uploads/2017/03/drake-fans-boycott-concert.jpg'
  })

  const beyonce = await Contract.create({
    eventId: 1,
    fulfilled: false
  })

  const sting = await Contract.create({
    eventId: 2,
    fulfilled: false
  })

  const kanye = await Contract.create({
    eventId: 3
  })

  await Promise.all([
    beyonce.setUsers(maggie),
    cody.setContracts(sting),
    maggie.setContracts(kanye),
    maria.setContracts(beyonce)
  ])

  console.log(green('Seeding success!'))
  db.close()
}

seed().catch(err => {
  console.error(red('Something went wrong'))
  console.error(err)
  db.close()
})

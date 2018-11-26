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

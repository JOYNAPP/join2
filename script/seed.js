'use strict'

const db = require('../server/db')
const {User, Contract, FunEvent} = require('../server/db/models')
const {green, red} = require('chalk')

const seed = async () => {
  await db.sync({force: true})

  const uma = await User.create({
    name: 'Uma Huggins',
    email: 'uma@email.com',
    password: '123'
  })

  const maggie = await User.create({
    name: 'Maggie Walker',
    email: 'maggie@email.com',
    password: '123'
  })

  const maria = await User.create({
    name: 'Maria Sanchez',
    email: 'maria@email.com',
    password: '123'
  })

  const liv = await User.create({
    name: 'Liv Marks',
    email: 'liv@email.com',
    password: '123'
  })

  const beyonce = await User.create({
    name: 'Beyonce Knowles',
    email: 'beyonce@email.com',
    password: '123'
  })

  const lucas = await User.create({
    name: 'Lucas Van Houten',
    email: 'lucas@email.com',
    password: '123'
  })

  const toph = await User.create({
    name: 'Toph Tucker',
    email: 'toph@email.com',
    password: '123'
  })

  const madeline = await User.create({
    name: 'Madeline Rivera',
    email: 'madeline@email.com',
    password: '123'
  })

  const poetsContract = await Contract.create({
    eventId: 50509775097,
    fulfilled: false
  })

  const newYearContract = await Contract.create({
    eventId: 52802889865,
    fulfilled: false
  })

  const drakeKanyeContract = await Contract.create({
    eventId: 52654146971,
    fulfilled: false
  })

  const poetsCorner = await FunEvent.create({
    name: 'The Poets Corner: Drake Special',
    id: 50509775097,
    date: 'Wed Nov 28 2018',
    imgUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F50141046%2F69189007357%2F1%2Foriginal.jpg?h=200&w=450&auto=compress&rect=0%2C258%2C2078%2C1039&s=70169fea1b160bc24baaaae1073c582b'
  })

  const drakeNewYear = await FunEvent.create({
    name: 'Drake: Happy New Year!',
    id: 52802889865,
    date: 'Fri Dec 28 2018',
    imgUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F52909684%2F250940881542%2F1%2Foriginal.jpg?h=200&w=450&auto=compress&rect=0%2C99%2C1112%2C556&s=628da96cdd59bfda31d1dda11aa10409'
  })

  const drakeKanye = await FunEvent.create({
    name: 'A Different Drake vs. Kanye Party',
    id: 52654146971,
    date: 'Fri Nov 30 2018',
    imgUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F52766818%2F208028998426%2F1%2Foriginal.jpg?h=200&w=450&auto=compress&rect=0%2C568%2C2560%2C1280&s=2fcc460ad7c9b204c313a17b09f066eb'
  })

  await Promise.all([
    poetsContract.setUsers(maggie),
    newYearContract.setUsers(liv),
    drakeKanyeContract.setUsers(maggie),
    liv.setContracts(poetsContract),
    maria.setContracts(drakeKanyeContract),

  ])

  console.log(green('Seeding success!'))
  db.close()
}

seed().catch(err => {
  console.error(red('Something went wrong'))
  console.error(err)
  db.close()
})

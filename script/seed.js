'use strict'

const db = require('../server/db')
const {User, FunEvent} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    // User.create({email: 'cody@email.com', password: '123'}),
    // User.create({email: 'murphy@email.com', password: '123'})
    User.bulkCreate([
      {
        name: 'Claire',
        email: 'claire@gmail.com',
        password: '1234',
        isAdmin: false,
        invitedTo: [1, 4, 5, 6, 7],
        attending: [1, 5, 7],
        pastEvents: [2]
      },
      {
        name: 'Sarai',
        email: 'sarai@gmail.com',
        password: '567',
        isAdmin: false,
        invitedTo: [5, 6, 7, 8],
        attending: [5, 7, 8],
        pastEvents: [1, 2, 10, 11]
      },
      {
        name: 'Mary',
        email: 'mary@gmail.com',
        password: '567',
        isAdmin: false,
        invitedTo: [7, 8],
        attending: [8],
        pastEvents: [11, 12, 13]
      },
      {
        name: 'Steve',
        email: 'steve@gmail.com',
        password: '567',
        isAdmin: false,
        invitedTo: [5, 6],
        attending: [3, 5],
        pastEvents: [13, 14]
      },
      {
        name: 'Maggie',
        email: 'mags@gmail.com',
        password: '1010',
        isAdmin: true,
        invitedTo: [5, 6],
        attending: [3, 5],
        pastEvents: [13, 14]
      },
      {
        name: 'Uma',
        email: 'ums@gmail.com',
        password: '2020',
        isAdmin: true,
        invitedTo: [5, 6],
        attending: [3, 5],
        pastEvents: [13, 14]
      },
      {
        name: 'Maria',
        email: 'mars@gmail.com',
        password: '3030',
        isAdmin: true,
        invitedTo: [5, 6],
        attending: [3, 5],
        pastEvents: [13, 14]
      }
    ]),
    FunEvent.bulkCreate([
      {
        name: 'Drake'
      }
    ])
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

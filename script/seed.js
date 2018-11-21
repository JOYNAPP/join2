'use strict'

const db = require('../server/db')
const { User, Contract} = require('../server/db/models')
const { green, red } = require('chalk')

const contracts = [{
  eventId: 1,
  personOneId: 1,
  personTwoId: 3,
  personOneRes: 'pending',
  personTwoRes: 'pending',
  fulfilled: false
},{
  eventId: 2,
  personOneId: 1,
  personTwoId: 2,
  personOneRes: 'yes',
  personTwoRes: 'pending',
  fulfilled: false
},
{
  eventId: 3,
  personOneId: 2,
  personTwoId: 3,
  personOneRes: 'yes',
  personTwoRes: 'yes',
  fulfilled: true
},
]

const users = [{
  name: 'Cody',
  email: 'cody@email.com',
  password: '123',
  invitedEvents: [1, 3, 5]
}, {
  name: 'Maggie',
  email: 'maggie@email.com',
  password: '123',
  invitedEvents: [1, 5]
}, {
  name: 'Bobo',
  email: 'bobo@email.com',
  password: '123',
  invitedEvents: [5, 6]
}
]


const seed = () =>
  Promise.all(contracts.map(elem => Contract.create(elem))
  )
    .then(() =>
      Promise.all(users.map(elem => User.create(elem))
      )
    )

const main = () => {
  console.log('Syncing the db...');
  db.sync({ force: true })
    .then(() => {
      console.log(green('Seeding the database...'));
      return seed();
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err);
    })
    .then(() => {
      db.close();
      console.log(green('Seeded Successfully!!'));
      return null;
    })

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${contracts.length} contracts`)
}
main();
















///////////////////////////////////////////////////////////

// 'use strict'

// const db = require('../server/db')
// const {User} = require('../server/db/models')

// async function seed() {
//   await db.sync({force: true})
//   console.log('db synced!')

//   const users = await Promise.all([
//     User.create({email: 'cody@email.com', password: '123'}),
//     User.create({email: 'murphy@email.com', password: '123'})
//   ])

//   console.log(`seeded ${users.length} users`)
//   console.log(`seeded successfully`)
// }

// // We've separated the `seed` function from the `runSeed` function.
// // This way we can isolate the error handling and exit trapping.
// // The `seed` function is concerned only with modifying the database.
// async function runSeed() {
//   console.log('seeding...')
//   try {
//     await seed()
//   } catch (err) {
//     console.error(err)
//     process.exitCode = 1
//   } finally {
//     console.log('closing db connection')
//     await db.close()
//     console.log('db connection closed')
//   }
// }

// // Execute the `seed` function, IF we ran this module directly (`node seed`).
// // `Async` functions always return a promise, so we can use `catch` to handle
// // any errors that might occur inside of `seed`.
// if (module === require.main) {
//   runSeed()
// }

// // we export the seed function for testing purposes (see `./seed.spec.js`)
// module.exports = seed

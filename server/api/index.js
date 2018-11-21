const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))

// // Get all users
// router.get('/', async function(req, res, next) {
//   try {
//     const allUsers = await User.findAll()
//     console.log('All Users!')
//     res.status(200).send(allUsers)
//   } catch (error) {
//     next(error)
//   }
// })

// // Get particular user by their id
// router.get('/:id', async function(req, res, next) {
//   try {
//     const id = req.params.id
//     const particularUser = await User.findById(id)
//     console.log('Particular User by ID!')
//     res.status(200).send(particularUser)
//   } catch (error) {
//     next(error)
//   }
// })

// // Create a user
// router.post('/', async function(req, res, next) {
//   try {
//     const newUser = await User.create({
//       name,
//       email,
//       password
//     })
//     console.log('Created User!')
//     res.status(201).send({message: 'Made new user! Woo!', newUser: newUser})
//   } catch (error) {
//     next(error)
//   }
// })

// // Update particular user
// router.put('/:id', async function(req, res, next) {
//   try {
//     const userToUpdate = await User.findById(req.params.id)
//     const updtatedUser = await userToUpdate.update({
//       name,
//       email,
//       password
//     })
//     res
//       .status(201)
//       .send({message: 'Made new user! Woo!', updtatedUser: updtatedUser})
//   } catch (error) {
//     next(error)
//   }
// })
// what is the point of listing out the variable vs req.body? id see any change when post (via postman). tried posting variable not listed and worked. tried not including variables listed and worked... ?.

// User.prototype.confirm = function(eventId){
//   let indxOfEvent = index of eventId
//   if(indxOfEvent !== -1){
//     this.invitedTo.slice(indxOfEvent..)
//     this.attending.push(eventId).sort
//   } else {
//     console.log('not invited to particular event')
//   }
//   // if eventId is in invitedTo array copy into variable, remove from invited to, and push into attending
// }

module.exports = router

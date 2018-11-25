const router = require('express').Router()
const {UserContract, Contract, User, FunEvent} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
 try {
      const users = await UserContract.findAll()
      res.json(users)
    } catch (err) {
      next(err)
    }
})

//This route will be used to pull the events that a user is associated with
router.get('/:id/events', async (req, res, next) => {
  try {
    const events = await User.findById(req.params.id, {
         include: [{model: Contract , include: FunEvent}]
    })
    if (events) {
      res.json(events)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

//This route will be used to pull other users that are associated with a specific contract, in addiiton to the current user
router.get('/:id/users', async (req, res, next) => {
  try {
    const events = await User.findById(req.params.id, {
         include: [{model: Contract , include: {model: User}}]
    })
    if (events) {
      res.json(events)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})
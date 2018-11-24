const router = require('express').Router()
const {UserContract, Contract, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
 try {
      const users = await UserContract.findAll()
      res.json(users)
    } catch (err) {
      next(err)
    }
})

router.get('/:id', async (req, res, next) => {
  try {
    const events = await User.findById(req.params.id, {
         include: [{model: Contract , include: User}]
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

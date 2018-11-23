const router = require('express').Router()
const {UserContract} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
 try {
      const users = await UserContract.findAll()
      res.json(users)
    } catch (err) {
      next(err)
    }
})

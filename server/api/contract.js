const router = require('express').Router()
const {Contract} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
 try {
      const cont = await Contract.findAll()
      res.json(cont)
    } catch (err) {
      next(err)
    }
})

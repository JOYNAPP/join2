const router = require('express').Router()
const {Contract, User} = require('../db/models')

module.exports = router


//This route lets us make a new contract and set friends associated with that contract
router.post('/', async (req, res, next) => {
  try {
      let contract = await Contract.create({
        eventId: req.body.eventId
      })
      await contract.setUsers([...req.body.friends])

      await contract.save()
  } catch(err) {
      console.error(err)
  }  
})

router.get('/:id', async (req, res, next) => {
  try {
    const contract = await Contract.findById(req.params.id, {
      include: [{model: User}]
    })
    res.json(contract)
  } catch(err) {
    console.error(err)
  }
})

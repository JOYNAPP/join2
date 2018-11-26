const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/userContract', require('./userContract'))
router.use('/events', require('./events'))
router.use('/contracts', require('./contracts'))
router.use('/logic', require('./logic'))

module.exports = router

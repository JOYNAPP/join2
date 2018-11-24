const User = require('./user')
const Contract = require('./contract')
const FunEvent = require('./event')

const UserContract = require('./userContract')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.belongsToMany(Contract, {through: UserContract})
Contract.belongsToMany(User, {through: UserContract})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Contract,
  UserContract,
  FunEvent
}

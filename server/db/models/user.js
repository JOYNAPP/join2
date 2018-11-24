const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  cardHolderName: {
    type: Sequelize.STRING,
  },
  creditCardNumber: {
    type: Sequelize.STRING,
    validate: {
      isCreditCard: true
    }
  },
  expirationDate: {
    type: Sequelize.STRING, //This should be changed to a MM/YY format
  },
  cvc: {
    type: Sequelize.INTEGER,
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  invitedEvents: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  attendedEvents: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  pastEvents: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  // isAdmin: {
  //   type: Sequelize.BOOLEAN,
  //   defaultValue: false
  // },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}
// User.prototype.confirm = function(eventId){
//   let indxOfEvent = index of eventId
//   if(indxOfEvent !== -1){
//     this.invitedTo.slice(indxOfEvent..)
//     this.attending.push(eventId).sort
//   } else {
//     console.log('not invited to particular event')
//   }
// if eventId is in invitedTo array copy into variable, remove from invited to, and push into attending
// }

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

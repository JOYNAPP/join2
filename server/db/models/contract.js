const Sequelize = require('sequelize')
const db = require('../db')

const Contract = db.define('contract', {
  eventId: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  eventName: {
    type: Sequelize.STRING
  },
  eventDate: {
    type: Sequelize.STRING
  },
  fulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Contract

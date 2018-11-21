const Sequelize = require('sequelize')
const db = require('../db')

const Contract = db.define('contract', {
  eventId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  fulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Contract

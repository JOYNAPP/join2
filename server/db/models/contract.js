const Sequelize = require('sequelize')
const db = require('../db')

const Contract = db.define('contract', {
  eventId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  personOneId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  personTwoId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  personOneRes: {
    type: Sequelize.STRING,
    validate: {
        isIn: [['yes', 'no', 'pending']],
    },
    defaultValue: 'pending'
  },
  personTwoRes: {
    type: Sequelize.STRING,
    validate: {
        isIn: [['yes', 'no', 'pending']],
    },
    defaultValue: 'pending'
  },
  fulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
})

module.exports = Contract

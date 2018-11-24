const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const FunEvent = db.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ticketPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})

module.exports = FunEvent

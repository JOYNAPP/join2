const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const FunEvent = db.define('event', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ticketPrice: {
    type: Sequelize.BIGINT,
    allowNull: false,
    defaultValue: 0
  },
  imgUrl: {
    type: Sequelize.STRING
  }
})

module.exports = FunEvent

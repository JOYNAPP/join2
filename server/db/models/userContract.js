const Sequelize = require('sequelize')
const db = require('../db')

const UserContract = db.define('userContract', {
    response: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    responded: {
        type: Sequelize.BOOLEAN,
        defaultValue: null
    }
})

module.exports = UserContract
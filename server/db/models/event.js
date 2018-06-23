const Sequelize = require('sequelize');
const db = require('../db');
const date = require('date-fns');

const EventSchema = db.define('eventSchema', {
  event: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startTime: {
    type: Sequelize.STRING,
    allowNull: false
  },
  endTime: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.STRING
  }
})

module.exports = EventSchema;

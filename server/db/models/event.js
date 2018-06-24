const Sequelize = require('sequelize');
const db = require('../db');
const date = require('date-fns');

const EventSchema = db.define('eventSchema', {
  event: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startTime: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endTime: {
    type: Sequelize.DATE,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

module.exports = EventSchema;

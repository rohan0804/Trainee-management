const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Leave = sequelize.define("leave", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  start_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  end_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  reason: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Leave;

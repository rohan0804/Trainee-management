const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Performance = sequelize.define("performance", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  extra_skills: {
    type: Sequelize.STRING,
    allowNull: false
  },
  totalmarks: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  marks_obtained: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Performance;

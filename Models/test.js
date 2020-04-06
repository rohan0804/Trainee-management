const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Test = sequelize.define("test", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  test_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  total_marks: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  obtained_marks: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  duration: {
    type: Sequelize.TIME,
    allowNull: false,
  },
});

module.exports = Test;

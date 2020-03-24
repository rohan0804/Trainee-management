const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Timelog = sequelize.define("timelog", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  start_time: {
    type: Sequelize.DATE,
    allowNull: false
  },
  end_time: {
    type: Sequelize.DATE,
    allowNull: false
  },

  task_memo: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
module.exports = Timelog;

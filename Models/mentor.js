const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Mentor = sequelize.define("mentor", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phoneNo: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
  mail_id: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
module.exports = Mentor;

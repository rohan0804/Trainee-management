const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("zapbuildhrm", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;

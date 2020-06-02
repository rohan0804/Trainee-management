const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const test = sequelize.define("test", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  test_file: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  duration: {
    type: Sequelize.TIME,
    allowNull: false,
  },
  totalmarks: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = test;

// create table test(id integer auto_increment primary key, name varchar(45), date date,test_description varchar(1000),
//duration datetime, totalmarks integer, mentor_id integer,
// foreign key(mentor_id) references mentor(id)
// );

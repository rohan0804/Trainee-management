const Sequelize = require('sequelize');
const sequelize = new Sequelize('zapbuildhrm','newuser1','1234',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = sequelize;
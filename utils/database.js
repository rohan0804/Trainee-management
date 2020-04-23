const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('zapbuildhrm','newuser','1234',{
    host:'localhost',
    dialect:'mysql',
    logging:false
})

module.exports = sequelize;

const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const csv=sequelize.define('Record',{
    id:{
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    }
});
module.exports=csv;
const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require('../utils/database');

const Notification = sequelize.define('notification',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    message:{
        type:DataTypes.STRING,
        allowNull:false   
    }

})

module.exports = Notification;
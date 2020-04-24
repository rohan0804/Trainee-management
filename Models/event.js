const Sequelize=require('sequelize');
const sequelize=require('../utils/database');
const Event=sequelize.define('event',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
        },
    heading:{
        type:Sequelize.STRING,
        allowNull:false
        },
    description:{
        type:Sequelize.STRING,
        allowNull:false
        },
    date:{
        type:Sequelize.DATEONLY,
        allowNull:false
        }
})

module.exports = Event;
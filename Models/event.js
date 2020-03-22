const Sequelize=require('sequelize');
const sequelize=require('../utils/database');
const Event=sequelize.define('event',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    eventHeading:{
        type:Sequelize.STRING,
        allowNull:false
    },
    eventDescription:{
        type:Sequelize.STRING,
        allowNull:false
    },
    eventDate:{
        type:Sequelize.DATE,
        allowNull:false
    }
})
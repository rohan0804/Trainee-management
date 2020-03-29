const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const Leave =sequelize.define('leave',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:true,
        primaryKey:true
    },
    date:{
        type:Sequelize.DATE,
        allowNull:true
    },
    reason:{
        type:Sequelize.STRING,
        allowNull:true
    }
});

module.exports=Leave;
const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const category=sequelize.define('category',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports=category;
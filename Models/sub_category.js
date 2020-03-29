const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const sub_category=sequelize.define('sub_category',{
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

module.exports=sub_category;
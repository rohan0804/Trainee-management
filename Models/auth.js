const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const Auth=sequelize.define('auth',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
});
module.exports=Auth;
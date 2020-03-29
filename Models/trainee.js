const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Trainee = sequelize.define('trainee',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    phone_no:{
        type:Sequelize.STRING,
        allowNull:false
    },
    joining_date:{
        type:Sequelize.STRING,
        allowNull:true
    },
    last_date:{
        type:Sequelize.STRING,
        allowNull:false
    },
    linkedin_profile:{
        type:Sequelize.STRING,
        allowNull:false
    },
    image_url:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = Trainee;
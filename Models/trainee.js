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
        allowNull:false
    },
    last_date:{
        type:Sequelize.STRING,
    },
    linkedin_profile:{
        type:Sequelize.STRING,
        allowNull:true
    },
    image_url:{
        type:Sequelize.BLOB('long'),
        allowNull:true
    }
})

module.exports = Trainee;
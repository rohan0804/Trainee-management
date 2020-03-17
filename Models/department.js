const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Department = sequelize.define('department',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true

    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    syllabus:{
        type:Sequelize.STRING,
        allowNull:false
    },
    department_head:{
        type:Sequelize.STRING,
        allowNull:false
    }

})

module.exports = Department;
const Sequelize=require('sequelize');
const sequelize=require('../utils/database');

const Announcement=sequelize.define('announcement',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    announcementTitle:{
        type:Sequelize.STRING,
        allowNull:false
    },
    announcementDescription:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
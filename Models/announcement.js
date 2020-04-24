const {Sequelize,DataTypes}=require('sequelize');
const sequelize=require('../utils/database');

const Announcement=sequelize.define('announcement',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    announcementTitle:{
        type:DataTypes.STRING,
        allowNull:false
    },
    announcementDescription:{
        type:DataTypes.STRING,
        allowNull:false
    },
    announcementDate:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    }
});

module.exports=Announcement;
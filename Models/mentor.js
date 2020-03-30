const Sequelize = require('sequelize');
const sequelize=require('../utils/database');

const Mentor=sequelize.define('mentor',{
  id:{
      type : Sequelize.INTEGER,
      autoIncrement:true,
      primaryKey : true,
      allowNull : false,
  },
  name:{
         type: Sequelize.STRING,
         allowNull: false,
     },
  phoneNo:{
      type : Sequelize.STRING,
      allowNull:false,
      validate:{
          len:[5,11]
      }
      
  }
});
module.exports = Mentor;
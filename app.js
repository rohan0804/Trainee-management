const express = require('express');
const app = express();
const sequelize = require('./utils/database');

const Department = require('./Models/department');
const Trainee = require('./Models/trainee.js');
const Mentor = require('./Models/mentor');
const Performance = require('./Models/performance');
const Role = require('./Models/role');
const Leave = require('./Models/leave');
const Timelog = require('./Models/timelog');
const Category = require('./Models/category');
const subCategory = require('./Models/sub_category');
const Test = require('./Models/test');
const Auth = require('./Models/auth');

Department.hasMany(Trainee, { foreignKey: 'department_id' });
Mentor.hasMany(Trainee,{foreignKey:'mentor_id'});
Auth.belongsTo(Role,{foreignKey:'role_id'});
Trainee.hasMany(Leave,{foreignKey:'trainee_id'});
Department.hasMany(Mentor,{foreignKey:'department_id'});
Test.hasMany(Performance,{foreignKey:'test_id'});
Performance.belongsTo(Trainee,{foreignKey:'trainee_id'});
Trainee.belongsTo(Auth,{foreignKey:'auth_id'});
Mentor.belongsTo(Auth,{foreignKey:'auth_id'});
Trainee.hasMany(Timelog,{foreignKey:'trainee_id'});
Category.hasMany(Timelog,{foreignKey:'category_id'});
subCategory.hasMany(Category,{foreignKey:'subcategory_id'});




sequelize
    .sync()
    .then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });


app.listen(4000, (req, res) => {
    console.log("server is listening");
})

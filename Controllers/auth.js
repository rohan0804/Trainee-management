const Auth = require('../Models/auth');
const Role = require('../Models/role');
const Trainee = require('../Models/trainee');
const Mentor=require('../Models/mentor');
const Department = require('../Models/department');
exports.getLogin = async(req,res,next)=>{
    res.render('login');
}

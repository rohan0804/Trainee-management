const Auth = require('../Models/auth');
const Role = require('../Models/role');
const Trainee = require('../Models/trainee');

exports.getLogin = async(req,res,next)=>{

}
exports.getTraineeSignup = (req,res)=>{
    res.render('trainee-signup');
}
exports.postTraineeSignup  = async(req,res)=>{
    const {name,email,password,phone_no,joining_date,last_date} = req.body;
    console.log(req.body);
    // const role = await Role.findOne({where:{name:"trainee"}})
    // const authDetails =await Auth.create({
    //     email,password,role_id:role.id
    // });

    // Trainee.create({

    // })
}

const Auth = require('../Models/auth');
const Role = require('../Models/role');
const Trainee = require('../Models/trainee');
const Mentor=require('../Models/mentor');
const Department=require('../Models/department');

exports.getLogin = async(req,res,next)=>{

}
exports.getTraineeSignup = async (req,res)=>{
    console.log('inside');
    const data=await Department.findAll();
    // console.log(data);
    // data.forEach(d=>{
    //     console.log(d.id);
    // })
    res.render('trainee-signup',{
        data:data
    });
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
};
exports.getAddMentor=async (req,res,next)=>{
    // res.send('pass');
    res.render('mentor-signup');
};

exports.postAddMentor=async (req,res)=>{
    const {name,email,phoneNo}=req.body;
    const department = await Department.find({where:{name:name}});
    const mentorDetails=await Mentor.create({
        name,email,phoneNo,department_id:department.dataValues.id
    });
    console.log(mentorDetails);
};
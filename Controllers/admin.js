const Role = require('../Models/role');
const Department=require('../Models/department');
const Mentor=require('../Models/mentor');

exports.postAddRole = async (req,res,next)=>{
    const {name} = req.body;
    const roleStatus = await Role.create({
        name
    });
    console.log(roleStatus);
};

exports.getAddDepartment=async (req,res,next)=>{

};

exports.postAddDepartment=async (req,res,next)=>{
    const {name,department_head}=req.body;
    const departmentDetails=await Department.create({
        name,department_head
    });
    console.log(departmentDetails);
};

exports.getAddMentor=async (req,res,next)=>{

};

exports.postAddMentor=async (req,res)=>{
    const {name,email,phoneNo}=req.body;
    const department = await Department.find({where:{name:name}});
    const mentorDetails=await Mentor.create({
        name,email,phoneNo,department_id:department.dataValues.id
    });
    console.log(mentorDetails);
};
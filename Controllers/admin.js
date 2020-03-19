const Auth = require('../Models/auth');
const Role = require('../Models/role');
const Department = require('../Models/department');
const Mentor = require('../Models/mentor');


//Role
exports.postAddRole = async (req, res, next) => {
    const { name } = req.body;
    const roleStatus = await Role.create({
        name
    });
    console.log(roleStatus);

}

//Department
exports.getAddDepartment = async (req, res, next) => {
    res.render('department');
};

exports.postAddDepartment = async (req, res, next) => {
    const { name, head, syllabus,department_head } = req.body;
    const department = await Department.create({
        name:name,
        department_head : head,
        syllabus:syllabus,
        department_head:department_head
        
     });
     console.log(department);

};

//Trainee
exports.getTraineeSignup = async(req, res) => {
    const data = await Department.findAll();
    res.render('trainee-signup',{
        data:data
    });
}
exports.postTraineeSignup = async (req, res) => {
    const { name, email, password, phone_no, joining_date, last_date } = req.body;
    console.log(req.body);
    
};

//Mentor
exports.getAddMentor = async (req, res, next) => {
    const departments = await Department.findAll();
    res.render('mentor-signup',{departments:departments});
    
};

exports.postAddMentor = async (req, res,next) => {

    const { name, email, phoneNo,department_id,password} = req.body;
    console.log(req.body);
    const auth = await Auth.create({
        email:email,
        password:password
    })
  
    const mentorDetails = await Mentor.create({
        name, email, phoneNo, department_id,auth_id:auth.id
    });
    console.log(mentorDetails);
};

exports.putAddMentor=async (req,res,next)=>{
    const updateMentor=await Mentor.update(
        {name:req.body.name,
        email:req.body.email,
        phoneNo:req.body.phoneNo,
        department_id:req.body.department_id},
        {where:{id:req.params.id}}
    );
    console.log(updateMentor);
};

exports.deleteMentor=async (req,res,next)=>{
    const deletementor=await Mentor.destroy({where:{id:req.params.id}});
};
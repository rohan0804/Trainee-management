const Role = require('../Models/role');
const Department = require('../Models/department');
const Mentor = require('../Models/mentor');
const Auth = require('../Models/auth');

exports.postAddRole = async (req, res, next) => {
    const { name } = req.body;
    const roleStatus = await Role.create({
        name
    });
    console.log(roleStatus);

}
exports.getAddDepartment = async (req, res, next) => {
    res.render('department');
};

exports.postAddDepartment = async (req, res, next) => {
    const { name, head, syllabus } = req.body;
    const department = await Department.create({
        name:name,
        department_head : head,
        syllabus:syllabus
        
     });
     console.log(department);
};

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

exports.getAddMentor = async (req, res, next) => {
    const departments = await Department.findAll();
    res.render('mentor-signup',{departments:departments});
    
};

exports.postAddMentor = async (req, res) => {

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

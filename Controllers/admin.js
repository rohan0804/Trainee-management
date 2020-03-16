const Role = require('../Models/role');

const Department = require('../Models/department');
const Mentor = require('../Models/mentor');

exports.postAddRole = async (req, res, next) => {
    const { name } = req.body;
    // const roleStatus = await Role.create({
    //     name
    // });
    // console.log(roleStatus);

}
exports.getAddDepartment = async (req, res, next) => {
    res.render('department');
};

exports.postAddDepartment = async (req, res, next) => {
    const { name, head, syllabus } = req.body;
    // const departmentDetails = await Department.create({
    //     name, department_head, syllabus
    // });
    // console.log(departmentDetails);
};

exports.getTraineeSignup = async(req, res) => {
    const data = await Department.findAll();
    // console.log(data);
    res.render('trainee-signup',{
        data:data
    });
}
exports.postTraineeSignup = async (req, res) => {
    const { name, email, password, phone_no, joining_date, last_date } = req.body;
    console.log(req.body);
    // const role = await Role.findOne({where:{name:"trainee"}})
    // const authDetails =await Auth.create({
    //     email,password,role_id:role.id
    // });

    // Trainee.create({

    // })
};

exports.getAddMentor = async (req, res, next) => {
    res.render('mentor-signup');
};

exports.postAddMentor = async (req, res) => {
    const { name, email, phoneNo } = req.body;
    const department = await Department.findOne({ where: { name: name } });
    const mentorDetails = await Mentor.create({
        name, email, phoneNo, department_id: department.dataValues.id
    });
    console.log(mentorDetails);
};

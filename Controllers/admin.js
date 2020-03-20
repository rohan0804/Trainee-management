const Role = require("../Models/role");
const Department = require("../Models/department");
const Mentor = require("../Models/mentor");
const Auth = require("../Models/auth");
const Trainee = require("../Models/trainee");
const bcrypt = require("bcryptjs");

/**
 * @method : postAddRole
 * @author : Nishit Arora
 * @description :
 * @return :
 * @param : [params]
 */
exports.postAddRole = async (req, res, next) => {
  try {
    const { name } = req.body;
    const roleStatus = await Role.create({
      name
    });
    console.log(roleStatus);
  } catch (error) {
    console.log(error);
  }
};

exports.getAddDepartment = async (req, res, next) => {
  res.render("department");
};
/**
 * @method : postAddDepartment
 * @author : Nishit Arora
 * @description :
 * @return :
 * @param : [params]
 */
exports.postAddDepartment = async (req, res, next) => {
  try {
    const { name, head, syllabus } = req.body;
    const department = await Department.create({
      name: name,
      department_head: head,
      syllabus: syllabus
    });
    console.log(department);
  } catch (error) {
    console.log(error);
  }
};

exports.getTraineeSignup = async (req, res) => {
  const departments = await Department.findAll();
  res.render("trainee-signup", {
    data: departments
  });
};

/**
 *
 * @method : postTraineeSignup(this will be modified)
 * @author : Nishit Arora
 * @description : it is for registering new trainees.This only works for one mentor for one department
 * not for multiple mentors for one deaprtment.
 * @return :
 * @param : [params]
 */

exports.postTraineeSignup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNo,
      joiningdate,
      lastdate,
      department_id,
      imgurl,
      linkedin_profile
    } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    const role = await Role.findOne({ where: { name: "trainee" } });
    const user = await Auth.findOne({ where: { email: email } });
    if (user) {
      throw new Error("user already exists");
    }
    const auth = await Auth.create({
      email,
      password: hashPassword,
      role_id: role.id
    });
    const mentors = await Mentor.findOne({
      where: { department_id: department_id }
    });
    const trainee = await Trainee.create({
      name,
      phone_no: phoneNo,
      joining_date: joiningdate,
      last_date: lastdate,
      department_id,
      mentor_id: mentors.id,
      image_url: imgurl,
      auth_id: auth.id,
      linkedin_profile
    });
  } catch (error) {
    console.log("error occured while registering user", error);
  }
  console.log(req.body);
};

exports.getAddMentor = async (req, res, next) => {
  try {
    const departments = await Department.findAll();
    res.render("mentor-signup", { departments: departments });
  } catch (error) {
    console.log(error);
  }
};
/**
 * @method : postAddMentor
 * @author : Nishit Arora
 * @description : Adding new mentor by HR
 * @return :
 * @param : [params]
 */
exports.postAddMentor = async (req, res) => {
  try {
    const { name, email, phoneNo, department_id, password } = req.body;
    const user = await Auth.findOne({ where: { email: email } });
    if (user) {
      throw new Error("Mentor email already exists");
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const role = await Role.findOne({ where: { name: "mentor" } });
    const auth = await Auth.create({
      email: email,
      password: hashPassword,
      role_id: role.id
    });
    const mentorDetails = await Mentor.create({
      name,
      phoneNo,
      department_id,
      auth_id: auth.id,
      department_id
    });
    console.log(mentorDetails);
  } catch (error) {
    console.log("error while registering mentor", error);
  }
};

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

    res.status(200).json({
      result: roleStatus
    });
  } catch (error) {
    res.status(400).json({
      error
    });
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
    res.status(200).json({
      result: department
    });
  } catch (error) {
    res.status(400).json({
      error
    });
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
 * @description : it is for registering new trainees.This only works for one mentor of one department
 * not for multiple mentors of one deaprtment.
 * @return :
 * @param : [params]
 */

exports.postTraineeSignup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone_no,
      joining_date,
      last_date,
      department_id,
      image_url,
      linkedin_profile,
      mentor_id
    } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    const role = await Role.findOne({ where: { name: "Trainee" } });
    const user = await Auth.findOne({ where: { email: email } });
    if (user) {
      throw new Error("user already exists");
    }
    const auth = await Auth.create({
      email: email,
      password: hashPassword,
      role_id: role.id
    });

    const trainee = await Trainee.create({
      name,
      phone_no,
      joining_date,
      last_date,
      phone_no,
      department_id,
      mentor_id,
      image_url,
      auth_id: auth.id,
      linkedin_profile
    });
    res.status(200).json({
      response_code: 200,
      status: "trainee created successfully",
      result: trainee
    });
  } catch (error) {
    res.status(400).json({
      response_code: 400,
      status: "error occured",
      error: error.message
    });
  }
  console.log(req.body);
};

/**
 * @method : getUpdateTrainee
 * @author : Taranjeet
 * @description : Trainee to be updated. it will be used with ejs while autofilling the information.
 * @return :
 * @param : [params]
 */
exports.getUpdateTrainee = async (req, res, next) => {
  try {
    const trainee_id = req.params.id;
    const trainee = await Trainee.findOne({ where: { id: trainee_id } });
    const auth = await Auth.findOne({ where: { id: trainee.auth_id } });
    if (auth) {
      res.status(200).json({
        response_code: 200,
        status: "trainee to be updated",
        result: {
          auth,
          trainee
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
/**
 * @method : postUpdateTrainee
 * @author : Taranjeet
 * @description : Update the trainee details
 * @return :
 * @param : [params]
 */

exports.postUpdateTrainee = async (req, res, next) => {
  try {
    const trainee_id = req.params.id;
    const {
      name,
      email,
      password,
      phone_no,
      joining_date,
      last_date,
      department_id,
      image_url,
      linkedin_profile,
      mentor_id
    } = req.body;
    const trainee = await Trainee.findOne({ where: { id: trainee_id } });
    const auth = await Auth.findOne({ where: { id: trainee.auth_id } });
    await Auth.update({ email: email }, { where: { id: auth.id } });
    const updatedTrainee = await Trainee.update(
      {
        name,
        phone_no,
        joining_date,
        last_date,
        linkedin_profile,
        image_url,
        department_id,
        mentor_id
      },
      { where: { id: trainee_id } }
    );
    res.status(200).json({
      response_code: 200,
      status: "trainee updated successfully",
      result: updatedTrainee
    });
  } catch (error) {
    res.status(400).json({
      response_code: 400,
      error: error.message
    });
  }
};

exports.getTrainee = async (req, res, next) => {
  try {
    const trainee_id = req.params.id;
    const trainee = await Trainee.findOne({ where: { id: trainee_id } });
    const auth = await Auth.findOne({ where: { id: trainee.auth_id } });
    res.status(200).json({
      response_code: 200,
      status: "trainee",
      result: {
        auth,
        trainee
      }
    });
  } catch (error) {
    console.log(error);
  }
};
/**
 * @method : postUpdateTrainee
 * @author : Taranjeet
 * @description : Delete the trainee details
 * @return : Deleting the Trainee Record with id as Parameter
 * @param : [params]
 */
exports.postDeleteTrainee = async (req, res, next) => {
  try {
    const trainee_id = req.params.id;
    const trainee = await Trainee.findOne({ where: { id: trainee_id } });
    const deletedTrainee = await Trainee.destroy({ where: { id: trainee.id } });
    const auth = await Auth.destroy({ where: { id: trainee.auth_id } });
    res.status(200).json({
      response_code: 200,
      status: "trainee deleted successfully",
      result: {
        trainee
      }
    });
  } catch (error) {
    res.status(200).json({
      response_code: 200,
      status: "error occured while deleting",
      error: error.message
    });
  }
};

exports.getMentor = async (req, res, next) => {
  try {
    const mentor_id = req.params.id;
    console.log(mentor_id);
    const mentor = await Mentor.findOne({ where: { id: mentor_id } });
    const auth = await Auth.findOne({ where: { id: mentor.auth_id } });
    res.status(200).json({
      response_code: 200,
      status: "Mentor details",
      result: {
        auth,
        mentor
      }
    });
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
    res.status(200).json({
      response_code: 200,
      status: "Mentor created successfully",
      result: {
        auth,
        mentorDetails
      }
    });
  } catch (error) {
    res.status(400).json({
      response_code: 400,
      error: error.message
    });
  }
};

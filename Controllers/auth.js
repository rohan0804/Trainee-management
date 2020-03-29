const Auth = require("../Models/auth");
const Role = require("../Models/role");
const Trainee = require("../Models/trainee");
const Mentor = require("../Models/mentor");
const Department = require("../Models/department");
const bcrypt = require("bcryptjs");

exports.getLogin = async (req, res, next) => {
  res.render("login");
};

/**
 * @method : postLogin
 * @author : Nishit Arora
 * @description : Common login page for all Roles
 * @return :
 * @param : [params]
 */

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ where: { email: email } });
    if (!user) {
      throw new Error("invalid email");
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new Error("incorrect password");
    }
    console.log(user);
    const role = await Role.findByPk(user.role_id);
    console.log(role);
    res.send(`<h1>Welcome ${role.name}<h1>`);
  } catch (error) {
    console.log(error);
  }
};

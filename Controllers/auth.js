const Auth = require("../Models/auth");
const Role = require("../Models/role");
const Trainee = require("../Models/trainee");
const Mentor = require("../Models/mentor");
const Department = require("../Models/department");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('config');
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
    
    const role = await Role.findByPk(user.role_id);
    const token = jwt.sign({role_id:role.id},config.get('jwtSecret'),{expiresIn:"1h"});
    if(!token) throw new Error("token cannot be generated");
    
    res.status(200).json({
      status:"loggedIn successfully",
      user,
      token
    })
  } catch (error) {
    res.status(400).json({
      error:error.message
    })
  }
};


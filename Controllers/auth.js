const Auth = require("../Models/auth");
const Role = require("../Models/role");
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
    const refreshToken = jwt.sign({role_id:role.id,auth_id:user.id},config.get('refreshTokenSecret'),{expiresIn:"7d"});
    const accessToken = jwt.sign({role_id:role.id,auth_id:user.id},config.get('jwtSecret'),{expiresIn:30*60});
    res.cookie('Token',accessToken,{httpOnly:true});
    res.cookie('refreshToken',refreshToken,{httpOnly:true});
    res.send('hello');
  } catch (error) {
    res.status(400).json({
      error:error.message
    })
  }
};


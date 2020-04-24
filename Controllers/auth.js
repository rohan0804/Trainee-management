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
    if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) throw {type:"email",error:"Invalid Email"};
    if(!password) throw {type:"password",error:"please enter your password"};
    const user = await Auth.findOne({ where: { email: email } });
    if (!user) {
      throw {type:"email",error:"You are not Registered"};
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw {type:"password",error:"Incorrect password"};
    }
    const role = await Role.findByPk(user.role_id);
    const refreshToken = jwt.sign({role_id:role.dataValues.id,auth_id:user.dataValues.id},config.get('refreshTokenSecret'),{expiresIn:"7d"});
    const accessToken = jwt.sign({role_id:role.dataValues.id,auth_id:user.dataValues.id},config.get('jwtSecret'),{expiresIn:30*60});
    res.cookie('Token',accessToken,{maxAge:30*60*1000,httpOnly:true});
    res.cookie('refreshToken',refreshToken,{maxAge:7*24*60*60*1000,httpOnly:true});
    return res.redirect(`/${role.dataValues.name}/dashboard`);
  } catch (error) {
    res.render('login',{
      error:error
    })
 }};


const app = require('express')();
const jwt = require('jsonwebtoken');
const config = require('config');
const Role = require('../Models/role');

/**
 * @method : postLogin
 * @author : Nishit Arora
 * @description : Middleware to refresh Access Tokens using Refresh Token
 * @return :
 * @param : [params]
 */
exports.auth = async (req,res,next)=>{
    try {
        
        const accessToken = req.cookies['Token'];
        const refreshToken = req.cookies['refreshToken'];
        jwt.verify(refreshToken,config.get('refreshTokenSecret'),(error,decode)=>{
            if(error){
            return res.redirect('/');
            }
            else{
                const currentTime = parseInt((Date.now()/1000).toFixed(0));
                jwt.verify(accessToken,config.get('jwtSecret'),(err,accessDecode)=>{
                if(err || accessDecode.exp-currentTime<=10*60){
                    let newAccesstoken = jwt.sign({role_id:decode.role_id,auth_id:decode.auth_id},config.get('jwtSecret'),{expiresIn:30*60});
                    res.clearCookie('Token');
                    req.cookies['Token'] = newAccesstoken;
                    res.cookie('Token',newAccesstoken,{maxAge:30*60*1000,httpOnly:true});
                    req.roleId = decode.role_id;
                    req.authId = decode.auth_id;
                    return next(); 
                    }
                    const accessTokenDecode = jwt.verify(accessToken,config.get('jwtSecret'));
                    req.roleId = accessTokenDecode.role_id,
                    req.authId = accessTokenDecode.auth_id
                    return next();
                })
                

            }
        });
        
      
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            error:error.message
        })
    }
    
}

exports.roleBasedControl = async(req,res,next)=>{
    try {
        let url = req.url.split('/')[1];
        const role = await Role.findByPk(req.roleId);
        if(role.dataValues.name.toLowerCase()==url.toLowerCase()){
            return  next();
        }
        return res.redirect('/');

    } catch (error) {
        console.log(error.message);
    }
   }

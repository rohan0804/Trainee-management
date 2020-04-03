const app = require('express')();
const jwt = require('jsonwebtoken');
const config = require('config');
exports.auth = async (req,res,next)=>{
    try {
        
        const accessToken = req.cookies['Token'];
        const refreshToken = req.cookies['refreshToken'];
        jwt.verify(refreshToken,config.get('refreshTokenSecret'),(error,decode)=>{
            if(error){
                res.redirect('/login');
            }
            else{
                const currentTime = parseInt((Date.now()/1000).toFixed(0));
                if(decode.exp-currentTime<600){
                    console.log("token updated");
                    const newAccesstoken = jwt.sign({role_id:decode.role_id,auth_id:decode.auth_id},config.get('jwtSecret'),{expiresIn:30*60});
                    res.clearCookie('Token');
                    req.cookies['Token'] = newAccesstoken;
                    res.cookie('Token',newAccesstoken,{httpOnly:true});
                    req.role = decode.role_id;
                    req.auth = decode.auth_id;
                    return next(); 
                }
                console.log("token not updated");
                const accessTokenDecode = jwt.verify(accessToken,config.get('jwtSecret'));
                req.role = accessTokenDecode.role_id,
                req.auth = accessTokenDecode.auth_id
                return next();

            }
        });
        
      
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            error:error.stack
        })
    }
    
}




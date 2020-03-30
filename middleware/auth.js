const app = require('express')();
const jwt = require('jsonwebtoken');
const config = require('config');
exports.auth = async (req,res,next)=>{
    try {
        
        const token =  req.headers.authorization;
        const decode = jwt.verify(token,config.get('jwtSecret'));
        
        if(!decode){
            throw new Error("invalid token");
        }
        req.role = decode.role_id;
        next();
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
    
}

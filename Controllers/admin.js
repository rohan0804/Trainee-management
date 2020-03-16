const Role = require('../Models/role');
exports.postAddRole = async (req,res)=>{
    const {name} = req.body;
    const roleStatus = await Role.create({
        name
    });
    console.log(roleStatus);
}
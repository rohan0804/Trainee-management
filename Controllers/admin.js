const Auth = require('../Models/auth');
const Role = require('../Models/role');
const Department = require('../Models/department');
const Mentor = require('../Models/mentor');
const Trainee = require('../Models/trainee');
const bcrypt = require('bcryptjs');

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
    

}

//Department
exports.getAddDepartment = async (req, res, next) => {
    res.render('department');
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
            name:name,
            department_head : head,
            syllabus:syllabus
         });
         console.log(department);
    } catch (error) {
        console.log(error);
    }
  
};

//Trainee
exports.getTraineeSignup = async(req, res) => {
    const departments = await Department.findAll();
    
    res.render('trainee-signup',{
        data:departments
    });
}

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
        const { name, email, password, phoneNo, joiningdate, lastdate,department_id,imgurl,linkedin_profile} = req.body;
        const hashPassword = await bcrypt.hash(password,12);
        const role = await Role.findOne({where:{name:"trainee"}});
        const user = await Auth.findOne({where:{email:email}});
        if(user){
            throw new Error("user already exists");
        }
        const auth = await Auth.create({
            email,password:hashPassword,role_id:role.id
        })
        const mentors = await Mentor.findOne({where:{department_id:department_id}});
        
        const trainee = await Trainee.create({
            name,phone_no:phoneNo,joining_date:joiningdate,
            last_date:lastdate,department_id,mentor_id:mentors.id,
            image_url:imgurl,auth_id:auth.id,
            linkedin_profile
        })
    } catch (error) {
        console.log("error occured while registering user",error);
    }
  
    
    console.log(req.body);
    
};

//Mentor
exports.getAddMentor = async (req, res, next) => {
    try {
        const departments = await Department.findAll();
        res.render('mentor-signup',{departments:departments});
        
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
    const { name, email, phoneNo,department_id,password} = req.body;
    const user = await Auth.findOne({where:{email:email}});
    if(user){
        throw new Error("Mentor email already exists");
    }
    const hashPassword = await bcrypt.hash(password,12);
    const role = await Role.findOne({where:{name:"mentor"}});
    const auth = await Auth.create({
        email:email,
        password:hashPassword,
        role_id:role.id
    })
    const mentorDetails = await Mentor.create({
        name,phoneNo,department_id,auth_id:auth.id,department_id
    });
    console.log(mentorDetails);
} catch (error) {
    console.log("error while registering mentor",error);
}
 
};
/**
   * @method : postAddMentor
   * @author : Shyamal Sharma
   * @description : Updating mentor information by HR
   * @return : 
   * @param : [params]
   */
exports.putAddMentor=async (req,res,next)=>{try{
    const updateMentor=await Mentor.update(
        {name:req.body.name,
        email:req.body.email,
        phoneNo:req.body.phoneNo,
        department_id:req.body.department_id},
        {where:{id:req.params.id}}
    );
    const mentor=await Mentor.findOne({where:{id:req.params.id}});
    const mentorAuth_id=await mentor.dataValues.auth_id;
        const email=await req.body.email;
        const password=await bcrypt.hash(req.body.password,12);
    const updateAuth=await Auth.update({
        email:email,
        password:password
    },{where:{id:mentorAuth_id}}
    )
    console.log(updateMentor);
    res.status(200).json(updateMentor);
}catch(error){
    res.status(400).json('Error');
}
};


/**
   * @method : postAddMentor
   * @author : Shyamal Sharma
   * @description : Deleting mentor information by HR
   * @return : 
   * @param : [params]
   */
exports.deleteMentor=async (req,res,next)=>{try{
    const mentor=await Mentor.findOne({where:{id:req.params.id}});
    const mentoremail=await mentor.dataValues.auth_id;
    const deletementor=await Mentor.destroy({where:{id:req.params.id}});
    const deletementorauth=await Auth.destroy({where:{id:mentoremail}});
    res.status(200).json(deletementor);
}catch(Error){
    res.status(400).json('Error');
}
};
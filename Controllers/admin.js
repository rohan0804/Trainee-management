const path = require('path');
const stream =require('stream');
var csvParser = require('csv-parser');
var fs = require('fs');
const Record = require('../Models/csv');
const Role = require("../Models/role");
const Department = require("../Models/department");
const Mentor = require("../Models/mentor");
const Auth = require("../Models/auth");
const Trainee = require("../Models/trainee");
const bcrypt = require("bcryptjs");
const Sequelize = require('sequelize');
const Announcement=require('../Models/announcement');
const socket=require('socket.io');
const Event = require('../Models/event');
const Notification  = require('../Models/notifications');
message = '';

const io = require('../socket');

const jwt = require('jsonwebtoken');
const config = require('config');
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
    const roleRecord = await Role.findOne({where:{name:name}});
    if(roleRecord) throw new Error("Role already exists");
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
  const mentor = await Mentor.findAll();
  const result = departments.map(department=>{
    return department.dataValues
  });
  const results = mentor.map(trainees=>{
    return trainees.dataValues
  });
  res.render('trainee-signup',{
    departments:result,
    mentor:results
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
    const imagefile =req.file.filename;
    const filepath =path.join(__dirname,'../uploads/'+imagefile);
    const imageRecord = await fs.readFileSync(filepath);
    const {name,email,password,phoneNo,joining_date,department,
      linkedin_profile,
      id
    } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    const role = await Role.findOne({ where: { name: "trainee" } });
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
      joining_date,
      phone_no:phoneNo,
      department_id:department,
      mentor_id:id,
      image_urlName:req.file.originalname,
      image_url:imageRecord.buffer,
      auth_id: auth.id,
      linkedin_profile
    });
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(400).json({
      response_code: 400,
      status: "error occured",
      error: error.stack
    });
  }
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
    const { name, email,department, phoneNo,password } = req.body;
    console.log(req.body);
    if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) throw {type:"email",error:"Invalid Email"};
    if(!/^[A-Za-z]+/.test(name)) throw {type:"name",error:"invalid name"};
    if(!password) throw {type:"password",error:"password cannot be empty"};
    if(! /[2-9]{2}\d{8}/.test(phoneNo)) throw {type:"phoneNo",error:"contact number is not valid"};
    const user = await Auth.findOne({ where: { email: email } });
    
    if (user) {
      throw {type:"email",error:"Mentor email already exists"};
    }
    const mentor = await Mentor.findOne({where:{phoneNo:phoneNo}});
    if(mentor!==null)throw {type:"phoneNo",error:"phoneNo already exists"};
    const hashPassword = await bcrypt.hash(password, 12);
    const role = await Role.findOne({ where: { name: "mentor" } });
    const departmentDetail = await Department.findOne({where:{name:department}});
    console.log(departmentDetail);
    const auth = await Auth.create({
      email: email,
      password: hashPassword,
      role_id: role.id
    });
    
    const mentorDetails = await Mentor.create({
      name,
      phoneNo,
      auth_id: auth.id,
      department_id:departmentDetail.dataValues.id
    });
    console.log(mentorDetails);
    res.status(200).json({
      response_code: 200,
      status: "Mentor created successfully",
      result: {
        auth,
        mentorDetails,
        
      }
    });
    // res.redirect('/admin/dashboard');
  }
  catch (error) {
    // res.status(400).json({
    //   response_code: 400,
    //   error: error.message
    // });
    const departments = await Department.findAll();
    const result = departments.map(department=>{
    return department.dataValues
  });
    res.render('signup',{
      error:error,
      departments:result
    });
    console.log(error);
  }
};

exports.getAddMentor = async(req,res)=>{
  const departments = await Department.findAll();
  
   const result = departments.map(department=>{
    return department.dataValues
  });
  console.log(result);
  res.render('mentor-signup',{
    departments:result
  });
}
/**
   * @method : postAddMentor
   * @author : Shyamal Sharma
   * @description : Updating mentor information by HR
   * @return : 
   * @param : [params]
   */

  exports.putAddMentor=async (req,res,next)=>{try{
    if(!req.body){
      res.status(403).send('Not found any information');
    }
    else{
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
}}catch(error){
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
  if(!req.params.id){
    res.status(403).send('id not found');
  }
  else{
    const mentor=await Mentor.findOne({where:{id:req.params.id}});
    const mentoremail=await mentor.dataValues.auth_id;
    const deletementor=await Mentor.destroy({where:{id:req.params.id}});
    const deletementorauth=await Auth.destroy({where:{id:mentoremail}});
    res.status(200).json(deletementor);}
}catch(Error){
    res.status(400).json('Error');
}
};

exports.getAddannouncement=async (req,res,next)=>{
  res.render('announcement');
};

/**
   * @method : postAddannouncement
   * @author : Shyamal Sharma
   * @description : Add announcement by HR
   * @return : 
   * @param : [params]
   */
exports.postAddannouncement = async (req, res,next) => {
  try {
    if(!req.body){
      res.status(403).send('NOT Filled');
    }
    else{
      const {heading,description} = req.body;
      const announcementDetails = await Announcement.create({
      announcementTitle:heading,
      announcementDescription:description
    });
    io.getio().emit('announcement',announcementDetails);
    res.status(200).json({status:'Announcement Created!'});}
  } catch (error) {
    res.status(400).json({error:error.message});
  }
};

/**
   * @method : putAddannouncement
   * @author : Shyamal Sharma
   * @description : update announcement by HR
   * @return : 
   * @param : [params]
   */
// exports.putAddannouncement=async (req,res,next)=>{
//   try{
//     const announcementEdit= await Announcement.update(
//       {
//         announcementTitle:req.body.Title,
//         announcementDescription:req.body.Description
//       },
//       {where:{id:req.params.id}}
//     );
//     res.status(200).json({status:'Announcement Updated!'});
//   }catch(error){
//     res.status(400).json({status:error.message});
//   }
// };

/**
   * @method : deleteAddannouncement
   * @author : Shyamal Sharma
   * @description : delete announcement by HR
   * @return : 
   * @param : [params]
   */
exports.deleteAddannouncement=async (req,res)=>{
  try{
    const announcementDelete=await Announcement.destroy({where:{id:req.params.id}});
    res.status(200).json({status:'Announcement Deleted'});
  }catch(error){
    res.status(400).json({status:error.message});
  }
}

exports.getAddEvents = async(req,res)=>{
  
  res.render('addEvents');
};

exports.postAddEvents = async(req,res)=>{
  try {
    console.log("post addevents ajax request");
    const {heading,description,date} = req.body;
    const event = await Event.create({heading,description,date});
    io.getio().emit('event',event);
    res.status(200).json({
        response_code:200,
        status:"event created successfully",
        result:{
          event
        }
      })
  } catch (error) {
      res.status(400).json({
        response_code:400,
        error:error.message
      })
  }
  
};

exports.getRecord =async (req,res)=>{
  res.render('index',message);
};

exports.postRecord =async (req,res)=>{
  try{
    if(path.extname(req.file.originalname)!=='.csv'){
      message='Only csv files allowed!';
      res.render('index',{message:message,status:'Not Valid'});
      res.status(403).json('Wrong File Type');
    }else if(!req.file){
      console.log('No file received');
      message='Error! in csv upload.';
      res.render('index',{message:message,status:'Not received'});
      res.status(404).json('CSV Not Found');
    }else{
      const csvfile =req.file.filename;
      const filepath =path.join(__dirname,'../uploads/'+csvfile);
      const record = await fs.createReadStream(filepath)
      .pipe(csvParser())
      .on('data',(row)=>{
        var results={
          id:row['id'],
          name:row['name'],
          description:row['description']
        };
        Record.create(results);
      })
      .on('end',()=>{
        //end
      });
      message='Successfully! uploaded';
      res.render('index',{message:message,status:'success'});
      res.status(200).json('CSV uploaded');
    }
  }catch(err){
    res.status(400).json({message:err.message});
  }
};


exports.adminDashboard = async(req,res)=>{
  console.log("inside admin dashboard");
  console.log(req.authId,req.roleId);
  const events = await Event.findAll();
  const announcements=await Announcement.findAll();
  const departments= await Department.findAll();
  const mentor = await Mentor.findAll();
  // const trainees = await Trainee.findAll();
  // const traineesResult = trainees.map(res=>{
  //   res['departmentName'] = await departments
  // });
  const result = events.map(event=>{
    return event.dataValues
  });
  const announcementresult = announcements.map(announcement=>{
    return announcement.dataValues
  });
  const notifications = await Notification.findAll();
  res.render('admin-dashboard',{
    notifications:notifications,
    events:events,
    announcements:announcements
  });
};


exports.listofTrainees = async (req,res,next)=>{
  try{
    let limit =9;
    let offset =0;
    let page = req.params.page;
    const trainees = await Trainee.findAndCountAll({});
    console.log(trainees.count);
    let pages = Math.ceil(trainees.count/limit);
    offset = limit*(page-1);
    const traineeRecord = await Trainee.findAll({
      attributes:['id','name','department_id','mentor_id'],
      limit:limit,
      offset:offset,
      $sort : { id : 0 }
    });
    res.status(200).json({
      status:true,
      'result':traineeRecord,
      'count':trainees.count,
      'pages':pages
    });
  }catch(error){
    res.status(400).json({
      status:false,
      message:'No data find',
      error
    });
  }
};

exports.findByName = async (req,res,next)=>{
  try{
    const name =await req.params.name;
    const trainee = await Trainee.findAll({
      where:{
        name:{
          [Sequelize.Op.like]:`${name}%`
        },
      }
    });
    res.status(200).json({
      status:true,
      trainee
    });
  }catch(error){
    res.status(400).json({
      status:false,
      message:'not find',
      error
    });
  }
};

exports.getNotifications = async(req,res)=>{
  res.render('notifications');
}

exports.postNotifications = async(req,res)=>{
  try {
    const {message} = req.body;
    if(!message) throw new Error("Notification Message Cannot be Blank")
    io.getio().emit('notification',message);
    const notification = await Notification.create({
        message:message
    })
    res.status(200).json({
      notification:notification
    })
  } catch (error) {
    res.status(400).json({
      error:error.message
    })
  }
  
}

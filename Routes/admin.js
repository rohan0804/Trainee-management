const express = require("express");
const multer = require('multer');
const path = require('path');
const router = express.Router();
const {
  postAddRole,
  postAddDepartment,
  getAddDepartment,
  getUpdateTrainee,
  getTrainee,
  postDeleteTrainee,
  getAddannouncement
  ,getRecord,
  listofTrainees,
  findByName
} = require("../Controllers/admin");
const {
  postTraineeSignup,getChat,
  getTraineeSignup,
  getMentor,
  postUpdateTrainee,
  postAddMentor,
  postAddannouncement,
  postRecord
} = require("../Controllers/admin");
const {
  putAddMentor,
  // putAddannouncement
}=require('../Controllers/admin');
const {
  deleteMentor,
  deleteAddannouncement
}=require('../Controllers/admin');
const {getAddEvents,postAddEvents,adminDashboard,getNotifications,postNotifications,getAddMentor} = require("../Controllers/admin");
// router.use(authorization);

const DIR = './uploads';

let storage = multer.diskStorage({
  fileFilter:(req,file,callback)=>{
    if(path.extname(file.originalname)!=='.csv'){
      return callback(new Error('Only csv files allowed'));
    }
    callback(null,true)
  },
  destination:(req,file,callback)=>{
    callback(null,DIR);
  },
  filename:(req,file,cb)=>{
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
let upload = multer({storage : storage});

router.post("/add/role", postAddRole);
router.post("/add/department", postAddDepartment);
router.get("/add/department", getAddDepartment);
router.post("/add/trainee", postTraineeSignup);
router.get("/add/trainee", getTraineeSignup);
router.get('/add/mentor',getAddMentor);
router.get("/add/mentor/:id", getMentor);
router.post("/add/mentor", postAddMentor);
router.put('/add/mentor/:id',putAddMentor);
router.delete('/add/mentor/:id',deleteMentor);

router.get("/update/trainee/:id", getUpdateTrainee);
router.post("/update/trainee/:id", postUpdateTrainee);

router.get("/trainee/:id", getTrainee);
router.post("/delete/trainee/:id", postDeleteTrainee);

router.get('/add/announcement',getAddannouncement);
router.post('/add/announcement',postAddannouncement);
// router.put('/add/announcement/:id',putAddannouncement);
router.delete('/add/announcement/:id',deleteAddannouncement);

router.get("/add/event",getAddEvents);
router.post("/add/event",postAddEvents);
router.get("/dashboard",adminDashboard);

router.get('/record',getRecord);
router.post('/csv/upload',upload.single('profile'),postRecord);

router.get('/listofTrainee/:page',listofTrainees);
router.get('/findByName/:name',findByName);

router.get('/notification',getNotifications);
router.post('/notification',postNotifications);

module.exports = router;

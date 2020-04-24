const express = require("express");
const router = express.Router();
const {
  postAddRole,
  postAddDepartment,
  getAddDepartment,
  getUpdateTrainee,
  getTrainee,
  postDeleteTrainee,
  getAddannouncement
} = require("../Controllers/admin");
const {
  postTraineeSignup,getChat,
  getTraineeSignup,
  getMentor,
  postUpdateTrainee,
  postAddMentor,
  postAddannouncement
} = require("../Controllers/admin");
const {
  putAddMentor,
  // putAddannouncement
}=require('../Controllers/admin');
const {
  deleteMentor,
  deleteAddannouncement
}=require('../Controllers/admin');
const {getAddEvents,postAddEvents,adminDashboard,authorization} = require("../Controllers/admin");
// router.use(authorization);

router.post("/add/role", postAddRole);
router.post("/add/department", postAddDepartment);
router.get("/add/department", getAddDepartment);
router.post("/add/trainee", postTraineeSignup);
router.get("/add/trainee", getTraineeSignup);
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

module.exports = router;
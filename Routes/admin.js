const express = require("express");
const router = express.Router();
const {postAddRole,postAddDepartment,getAddDepartment,getUpdateTrainee,getTrainee,postDeleteTrainee} = require("../Controllers/admin");
const {postTraineeSignup,getTraineeSignup,getMentor,postUpdateTrainee,postAddMentor,getAddEvents,postAddEvents,adminDashboard} = require("../Controllers/admin");

router.post("/add/role", postAddRole);
router.post("/add/department", postAddDepartment);
router.get("/add/department", getAddDepartment);
router.post("/add/trainee", postTraineeSignup);
router.get("/add/trainee", getTraineeSignup);
router.get("/add/mentor/:id", getMentor);
router.post("/add/mentor", postAddMentor);

router.get("/update/trainee/:id", getUpdateTrainee);
router.post("/update/trainee/:id", postUpdateTrainee);

router.get("/trainee/:id", getTrainee);
router.post("/delete/trainee/:id", postDeleteTrainee);

router.get("/add/event",getAddEvents);
router.post("/add/event",postAddEvents);
router.get("/dashboard",adminDashboard);
module.exports = router;

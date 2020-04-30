const express = require("express");
const router = express.Router();
const mentorcontroller = require("../Controllers/mentor");
const {mentorDashboard} = require("../Controllers/mentor");
/**
 * @author : Rohan
 * @description : Mentor Routes
 */
router.get("/getAllTest", mentorcontroller.getAllTests);
router.post("/addtest", mentorcontroller.postaddtest);
router.post("/calculateperformance", mentorcontroller.postcheckperformance);
router.post("/addperformance", mentorcontroller.postaddperformance);
router.post("/listOfTrainees/:departmentId", mentorcontroller.listOfTrainees);
router.post("/findByName/:name", mentorcontroller.findByName);

router.get("/doubts",mentorcontroller.gettraineeDoubts);
router.post("/doubts",mentorcontroller.posttraineeDoubts);
router.get('/dashboard',mentorDashboard);
module.exports = router;

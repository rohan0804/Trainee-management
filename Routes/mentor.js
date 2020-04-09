const express = require("express");
const router = express.Router();
const mentorcontroller = require("../Controllers/mentor");
/**
 * @author : Rohan
 * @description : Mentor Routes
 * @return :
 * @param :[]
 */
router.get("/getAllTest", mentorcontroller.getAllTests);
router.post("/addTest", mentorcontroller.postAddTest);
router.post("/calculatePerformance", mentorcontroller.postcheckperformance);
router.post("/addPerformance", mentorcontroller.postAddPerformance);
router.post("/listOfTrainees/:departmentId", mentorcontroller.listOfTrainees);
router.post("/findByName/:name", mentorcontroller.findByName);
router.post(
  "/sendMailToTrainees/:mentorId",
  mentorcontroller.sendMailToAllTrainees
);
router.post("/checkTimelog", mentorcontroller.checkTimelog);
router.get("/addDepartment", mentorcontroller.getAddDepartment);
router.post("/addDepartment", mentorcontroller.postAddDeprtment);
module.exports = router;

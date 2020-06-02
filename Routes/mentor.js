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
router.get("/getAddTest", mentorcontroller.getAddTest);
router.get("/addPerformance/:mentorId", mentorcontroller.getPerformance);
router.get("/traineeTimelog/:mentorId", mentorcontroller.getTraineeTimelog);
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
router.get("/dashboard", mentorcontroller.getDashboard);
router.get("/sendemail", mentorcontroller.getSendEmail);
router.get("/leaves/:id", mentorcontroller.getLeaveRecords);
router.get(
  "/checkPerformance/:departmentId",
  mentorcontroller.getCheckPerfromance
);
module.exports = router;

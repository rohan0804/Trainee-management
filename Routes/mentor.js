const express = require("express");
const router = express.Router();
const mentorcontroller = require("../Controllers/mentor");
router.get("/addtest", mentorcontroller.getaddtest);
router.get("/addperformance", mentorcontroller.getaddperformance);
router.get("/calculateperformance", mentorcontroller.getcheckperformance);
router.post("/addtest", mentorcontroller.postaddtest);
router.post("/calculateperformance", mentorcontroller.postcheckperformance);
router.post("/addperformance", mentorcontroller.postaddperformance);

module.exports = router;

<<<<<<< HEAD
// const express=require('express');
// const router=express.Router();

// const {getTrainee}=require('../Controllers/mentor');

// router.get('/list/trainee',getTrainee);

// module.exports=router;
=======
const express = require("express");
const router = express.Router();
const mentorcontroller = require("../Controllers/mentor");
/**
 * @author : Rohan
 * @description : Mentor Routes
 */
router.get("/addtest", mentorcontroller.getaddtest);
router.get("/addperformance", mentorcontroller.getaddperformance);
router.get("/calculateperformance", mentorcontroller.getcheckperformance);
router.post("/addtest", mentorcontroller.postaddtest);
router.post("/calculateperformance", mentorcontroller.postcheckperformance);
router.post("/addperformance", mentorcontroller.postaddperformance);

module.exports = router;
>>>>>>> 935ac339b3dd4c637017fcc57190efd35be8036b

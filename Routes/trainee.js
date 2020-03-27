const express = require("express");
const router = express.Router();
const traineeController = require("../Controllers/trainee");

/**
 * @author : Taranjeet
 * @description : Trainee Routes
 */
router.get("/chat", traineeController.getChat);




module.exports = router;
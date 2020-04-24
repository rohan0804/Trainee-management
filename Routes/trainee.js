const express = require("express");
const router = express.Router();
const traineeController = require("../Controllers/trainee");

/**
 * @author : Taranjeet
 * @description : Trainee Routes
 */
router.get("/chat", traineeController.gettraineeDoubts);
router.post("/chat",traineeController.posttraineeDoubts);

router.get("/dashboard", traineeController.gettraineeDashboard);
module.exports = router;


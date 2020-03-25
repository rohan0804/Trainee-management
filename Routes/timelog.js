const express = require("express");
const router = express.Router();
const {
  postTimelog,
  getTimelogData,
  deleteTimelog,
  updateTimelogRecord
} = require("../Controllers/timelog");

router.post("/add", postTimelog);
router.get("/:id", getTimelogData);
router.get("/:id/:trainee_id", updateTimelogRecord);
router.delete("/:id/:trainee_id", deleteTimelog);

module.exports = router;

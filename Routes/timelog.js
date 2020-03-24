const express = require("express");
const router = express.Router();
const { postTimelog, getTimelogData } = require("../Controllers/timelog");

router.post("/", postTimelog);
router.get("/List", getTimelogData);

module.exports = router;

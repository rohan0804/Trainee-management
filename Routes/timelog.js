const express = require("express");
const router = express.Router();
const { postTimelog } = require("../Controllers/timelog");

router.post("/", postTimelog);

module.exports = router;

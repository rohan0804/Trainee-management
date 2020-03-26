const express = require("express");
const router = express.Router();
const {
  postTimelog,
  getTimelogData,
  deleteTimelog,
  updateTimelogRecord
} = require("../Controllers/timelog");

router.post("/add", function(req, res, next) {
  postTimelog(req.body)
    .then(data => {
      res.status(data.status).json(data.data);
    })
    .catch(err => {
      res.status(err.status).json(err.data);
    });
});
router.get("/:id", getTimelogData);
router.get("/:id/:trainee_id", updateTimelogRecord);
router.delete("/:id/:trainee_id", deleteTimelog);

module.exports = router;

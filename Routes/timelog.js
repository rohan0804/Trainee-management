const express = require("express");
const router = express.Router();
const {
  postTimelog,
  getTimelogData,
  deleteTimelog,
  updateTimelogRecord
} = require("../Controllers/timelog");

router.post("/add", (req, res, next) => {
  postTimelog(req.body)
    .then(data => {
      res.status(data.status).json(data.data);
    })
    .catch(err => {
      res.status(err.status).json(err.data);
    });
});
router.get("/:id", getTimelogData);
router.get("/:id/:trainee_id/:date", (req, res, next) => {
  updateTimelogRecord(req.params, req.body)
    .then(data => {
      res.status(data.status).json(data.data);
    })
    .catch(err => {
      res.status(err.status).json(err.data);
    });
});
router.delete("/:id/:trainee_id", deleteTimelog);

module.exports = router;

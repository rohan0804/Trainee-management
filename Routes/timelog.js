const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {
  postTimelog,
  getTimelogData,
  deleteTimelog,
  updateTimelogRecord,
} = require("../Controllers/timelog");

router.post(
  "/add",
  [check("task_memo").not().isEmpty().withMessage("task_memo is required")],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    postTimelog(req.body)
      .then((data) => {
        res.status(data.status).json(data.data);
      })
      .catch((err) => {
        res.status(err.status).json(err.data);
      });
  }
);
router.get("/:id", getTimelogData);
router.get("/:id/:trainee_id/:date", (req, res, next) => {
  updateTimelogRecord(req.params, req.body)
    .then((data) => {
      res.status(data.status).json(data.data);
    })
    .catch((err) => {
      res.status(err.status).json(err.data);
    });
});
router.delete("/:id/:trainee_id", deleteTimelog);

module.exports = router;

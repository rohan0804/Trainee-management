const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {
  postTest,
  getTest,
  deleteTest,
  updateTestRecord,
} = require("../Controllers/test");
//route for insertion
router.post(
  "/add",
  [
    check("test_name").not().isEmpty().withMessage("Test_name is required"),
    check("total_marks")
      .not()
      .isEmpty()
      .withMessage("Value is required")
      .isNumeric()
      .withMessage("Numeric value is required"),
    check("obtained_marks")
      .not()
      .isEmpty()
      .withMessage("Value is required")
      .isNumeric()
      .withMessage("Numeric value is required"),
  ],

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    postTest(req.body)
      .then((data) => {
        res.status(data.status).json(data.data);
      })
      .catch((err) => {
        res.status(err.status).json(err.data);
      });
  }
);
//route for listing
router.get("/:id", getTest);

//route for deletion
router.delete("/:id/:trainee_id", deleteTest);

//route for updation
router.get("/:id/:trainee_id", (req, res) => {
  updateTestRecord(req.params, req.body)
    .then((data) => {
      res.status(data.status).json(data.data);
    })
    .catch((err) => {
      res.status(err.status).json(err.data);
    });
});
module.exports = router;

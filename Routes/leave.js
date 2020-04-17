const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {
  postLeave,
  getLeaveRecords,
  deleteLeave,
  updateLeaveRecord,
} = require("../Controllers/leave");

router.get('/', (req, res) => {
  res.render('leave')
  
})

//route for insertion
router.post(
  "/add",
  [
    check("subject")
      .not()
      .isEmpty()
      .withMessage("Subject is required")
      .isLength({ min: 3 }),
    check("reason")
      .not()
      .isEmpty()
      .withMessage("Leave reason is required")
      .isLength({ min: 10 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    postLeave(req.body)
      .then((data) => {
        res.render('leave');
      })
      .catch((err) => {
        res.status(err.status).json(err.data);
      });
  }
);

//route for listing
router.get("/:id", getLeaveRecords);

//route for updation
router.get("/:id/:trainee_id", (req, res, next) => {
  updateLeaveRecord(req.params, req.body)
    .then((data) => {
      res.status(data.status).json(data.data);
    })
    .catch((err) => {
      res.status(err.status).json(err.data);
    });
});
//route for deletion
router.delete("/:id/:trainee_id", deleteLeave);

module.exports = router;

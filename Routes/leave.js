const express = require("express");
const router = express.Router();
const {
  postLeave,
  getLeaveRecords,
  deleteLeave,
  updateLeaveRecord
} = require("../Controllers/leave");
//route for insertion
router.post("/add", (req, res, next) => {
  postLeave(req.body)
    .then(data => {
      res.status(data.status).json(data.data);
    })
    .catch(err => {
      res.status(err.status).json(err.data);
    });
});

//route for listing
router.get("/:id", getLeaveRecords);

//route for updation
router.get("/:id/:trainee_id", (req, res, next) => {
  updateLeaveRecord(req.params, req.body)
    .then(data => {
      res.status(data.status).json(data.data);
    })
    .catch(err => {
      res.status(err.status).json(err.data);
    });
});
//route for deletion
router.delete("/:id/:trainee_id", deleteLeave);

module.exports = router;

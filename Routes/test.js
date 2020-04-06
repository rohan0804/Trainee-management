const express = require("express");
const router = express.Router();
const {
  postTest,
  getTest,
  deleteTest,
  updateTestRecord,
} = require("../Controllers/test");
//route for insertion
router.post("/add", (req, res) => {
  postTest(req.body)
    .then((data) => {
      res.status(data.status).json(data.data);
    })
    .catch((err) => {
      res.status(err.status).json(err.data);
    });
});
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

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const {
  postTimelog,
  getTimelogData,
  deleteTimelog,
  updateTimelogRecord,
} = require("../Controllers/timelog");

router.post(
  "/add",
  [
    check("category").not().isEmpty().withMessage("category is required"),

    check("sub category")
      .not()
      .isEmpty()
      .withMessage("sub category is required"),

    check("start_time")
      .not()
      .isEmpty()
      .withMessage("Start time is required")
      .custom((value) => {
        if (!moment(value, "HH:mm A", true).isValid()) {
          throw new Error("time format is invalid");
        }
        return true;
      }),

    check("end_time")
      .not()
      .isEmpty()
      .withMessage("End time is required")
      .custom((value) => {
        if (!moment(value, "HH:mm A", true).isValid()) {
          throw new Error("time format is invalid");
        }
        return true;
      }),

    check("date")
      .not()
      .isEmpty()
      .withMessage("date is required")
      .custom((value) => {
        if (!moment(value, "MM/DD/YYYY", true).isValid()) {
          throw new Error("date format is invalid");
        }
        return true;
      }),

    check("task_memo").not().isEmpty().withMessage("task_memo is required"),
  ],
  (req, res, next) => {
    const result = validationResult(req);
    var errors = {};

    for (let error of result.array()) {
      if (!errors.hasOwnProperty(error.param)) {
        errors[error.param] = error.msg;
      }
    }
    if (!result.isEmpty()) {
      res.render("timelog", {
        error: "",
        errors: errors,
      });
    } else {
      postTimelog(req.body)
        .then((data) => {
          if (data.status != 200) {
            res.render("timelog", { error: data.data.msg, errors: {} });
          } else {
            res.redirect("/timelog");
          }
        })
        .catch((err) => {
          console.log(err.message);
          res.status(400).json({});
        });
    }
  }
);

//route for listing
router.get("/:id", (req, res, next) => {
  getTimelogData(req.params)
    .then((data) => {
      if (data.status != 200) {
        res.render("timelog", { error: data.data.msg });
      } else {
        res.redirect("/timelog");
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json({});
    });
});

//route for update record
// router.get("/:id/:trainee_id/:date", (req, res, next) => {
//   updateTimelogRecord(req.params, req.body)
//     .then((data) => {
//       res.status(data.status).json(data.data);
//     })
//     .catch((err) => {
//       res.status(err.status).json(err.data);
//     });
// });

router.get(
  "/:id/:trainee_id/:date",
  [
    check("category").not().isEmpty().withMessage("category is required"),

    check("sub category")
      .not()
      .isEmpty()
      .withMessage("sub category is required"),

    check("start_time")
      .not()
      .isEmpty()
      .withMessage("Start time is required")
      .custom((value) => {
        if (!moment(value, "HH:mm A", true).isValid()) {
          throw new Error("time format is invalid");
        }
        return true;
      }),

    check("end_time")
      .not()
      .isEmpty()
      .withMessage("End time is required")
      .custom((value) => {
        if (!moment(value, "HH:mm A", true).isValid()) {
          throw new Error("time format is invalid");
        }
        return true;
      }),

    check("date")
      .not()
      .isEmpty()
      .withMessage("date is required")
      .custom((value) => {
        if (!moment(value, "MM/DD/YYYY", true).isValid()) {
          throw new Error("date format is invalid");
        }
        return true;
      }),

    check("task_memo").not().isEmpty().withMessage("task_memo is required"),
  ],
  (req, res, next) => {
    const result = validationResult(req);
    var errors = {};

    for (let error of result.array()) {
      if (!errors.hasOwnProperty(error.param)) {
        errors[error.param] = error.msg;
      }
    }
    if (!result.isEmpty()) {
      res.render("timelog", {
        error: "",
        errors: errors,
      });
    } else {
      updateTimelogRecord(req.params, req.body)
        .then((data) => {
          if (data.status != 200) {
            res.render("timelog", { error: data.data.msg, errors: {} });
          } else {
            res.redirect("/timelog");
          }
        })
        .catch((err) => {
          console.log(err.message);
          res.status(400).json({});
        });
    }
  }
);

//route for delete record
router.delete("/:id/:trainee_id", (req, res, next) => {
  deleteTimelog(req.params)
    .then((data) => {
      if (data.status != 200) {
        res.render("timelog", { error: data.data.msg });
      } else {
        res.redirect("/timelog");
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json({});
    });
});
module.exports = router;

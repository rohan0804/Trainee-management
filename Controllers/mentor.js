const Trainee = require("../Models/trainee");
const Mentor = require("../Models/mentor");
const Department = require("../Models/department");
const Test = require("../Models/test");
const Performance = require("../Models/performance");
const io = require('../socket');

/**
 * @author : Rohan
 * @method : getaddtest
 * @description : it helps to render the test view to mentor
 */
exports.getaddtest = async (req, res, next) => {
  res.render("test");
};
/**
 * @author : Rohan
 * @method : postaddtest
 * @description : it helps to add test by mentor to trainees.
 */
exports.postaddtest = async (req, res, next) => {
  //   console.log(req.body);
  try {
    const { name, date, description, duration, totalmarks } = req.body;
    // console.log(description);
    const createdtest = await Test.create({
      name: name,
      date: date,
      test_description: description,
      duration: duration,
      totalmarks: totalmarks
    });
    // console.log(createdtest);
    res.status(200).json({
      response_code: 200,
      status: "pass"
    });
  } 
  catch (error) {
    res.status(400).json({
      response_code: 400,
      error: error.message
    });
  }
};
/**
 * @author : Rohan
 * @method : getcheckperformance
 * @description : it helps to render the performance view to mentor with all trainee names.
 */
exports.getcheckperformance = async (req, res, next) => {
  const trainees = await Trainee.findAll();
  // console.log(trainees);
  res.status(200).json({
    response_code: 200,
    trainees: trainees,
  });
};
/**
 * @author : Rohan
 * @method : postcheckperformance
 * @description : it helps to mentor for calculate the performance of individual trainee by
 * their marks grade and skills.
 */
exports.postcheckperformance = async (req, res, next) => {
  // console.log(req.body);
  let totalmarks = 0,
    skills = [],
    percentage = 0,
    grade = "",
    scoredmarks = 0;
  try {
    const { trainee } = req.body;
    const traineeRecords = await Performance.findAll({
      where: {
        trainee_id: trainee
      }
    });
    // console.log(traineeRecords);
    traineeRecords.forEach(traineeRecord => {
      totalmarks += traineeRecord.totalmarks;
      scoredmarks += traineeRecord.marks_obtained;
      skills.push(traineeRecord.extra_skills);
    });
    //calculating the percentage
    percentage = ((scoredmarks * 100) / totalmarks).toFixed(2);
    if (percentage >= 97 && percentage <= 100) grade = "A+";
    else if (percentage >= 93 && percentage <= 96) grade = "A";
    else if (percentage >= 90 && percentage <= 92) grade = "A-";
    else if (percentage >= 87 && percentage <= 89) grade = "B+";
    else if (percentage >= 83 && percentage <= 86) grade = "B";
    else if (percentage >= 80 && percentage <= 82) grade = "B-";
    else if (percentage >= 77 && percentage <= 79) grade = "C+";
    else if (percentage >= 73 && percentage <= 76) grade = "C";
    else if (percentage >= 70 && percentage <= 72) grade = "C-";
    else if (percentage >= 67 && percentage <= 69) grade = "D+";
    else if (percentage >= 63 && percentage <= 66) grade = "D";
    else if (percentage >= 60 && percentage <= 62) grade = "D-";
    else if (percentage >= 0 && percentage <= 59) grade = "F";
    console.log("per " + percentage + "%");
    console.log("grade=" + grade);
    console.log("totalmarks=" + totalmarks);
    console.log("scoredmarks=" + scoredmarks);
    console.log("extra skills=" + skills);
    res.status(200).json({
      response_code: 200,
      status: "pass",
    });
  } 
  catch (error) {
    res.status(400).json({
      response_code: 400,
      error: error.message
    });
  }
};
/**
 * @author : Rohan
 * @method : getaddperformance
 * @description : it helps to render the addperformance view with required data from tTest
 *  and Trainee models.
 */
exports.getaddperformance = async (req, res, next) => {
  try {
    const trainees = await Trainee.findAll();
    const tests = await Test.findAll();
    res.status(200).json({
      response_code: 200,
      trainees: trainees,
      tests: tests
    });
  } 
  catch (error) {
    res.status(400).json({
      response_code: 400,
      error: error.message
    });
  }
};
/**
 * @author : Rohan
 * @method : postaddperformance
 * @description : it helps to add the shills of a particular trainee by his mentor and
 * create a performance of a particular trainee.
 */
exports.postaddperformance = async (req, res, next) => {
  try {
    const { skills, totalmarks, obtainedmarks, trainee, test } = req.body;
    const newperformance = await Performance.create({
      extra_skills: skills,
      totalmarks: totalmarks,
      marks_obtained: obtainedmarks,
      test_id: test,
      trainee_id: trainee
    });
    
    res.status(200).json({
      response_code: 200,
      status: "performance added successfully",
    });
  } 
  catch (error) {
    res.status(400).json({
      response_code: 400,
      error: error.message
    });
  }
};

exports.gettraineeDoubts = async (req, res, next) => {
  res.render('doubt');
}

exports.posttraineeDoubts = async (req , res , next) => {
 
}

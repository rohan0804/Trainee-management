const Trainee = require("../Models/trainee");
const Mentor = require("../Models/mentor");
const Department = require("../Models/department");
const Test = require("../Models/test");
const Performance = require("../Models/performance");

exports.getaddtest = async (req, res, next) => {
  res.render("test");
};

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
    res.send("pass");
  } catch (error) {
    console.log(error.message);
  }
};

exports.getcheckperformance = async (req, res, next) => {
  const trainees = await Trainee.findAll();
  // console.log(trainees);
  res.render("performance", {
    trainees: trainees
  });
};

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
    res.send("pass");
  } catch (error) {
    console.log(error);
  }
};
exports.getaddperformance = async (req, res, next) => {
  try {
    const trainees = await Trainee.findAll();
    const tests = await Test.findAll();
    res.render("addperformance", {
      trainees: trainees,
      tests: tests
    });
  } catch (error) {
    console.log(error);
  }
};

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
    res.send("performance added successfully");
  } catch (error) {
    console.log(error);
  }
};

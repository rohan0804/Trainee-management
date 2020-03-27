const Trainee = require("../Models/trainee");
const Mentor = require("../Models/mentor");
const Department = require("../Models/department");
const Test = require("../Models/test");
const Performance = require("../Models/performance");
const { Op } = require("sequelize");
/**
 * @author : Rohan
 * @method : postaddtest
 * @description : To add a test by mentor.
 * @return :
 * @param :[name, date, description, duration, totalmarks]
 */
exports.postaddtest = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, date, description, duration, totalmarks } = req.body;
    const createdtest = await Test.create({
      name: name,
      date: date,
      test_description: description,
      duration: duration,
      totalmarks: totalmarks
    });
    res.status(201).json({
      status: true,
      statusCode: res.statusCode,
      createdtest
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      statusCode: res.statusCode,
      message: "could not create test",
      error
    });
  }
};
/**
 * @author : Rohan
 * @method : postcheckperformance
 * @description : it helps to mentor for calculate the performance of individual trainee by
 * their marks grade and skills.
 * @return :
 * @param :[trainee]
 */
exports.postcheckperformance = async (req, res, next) => {
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
    res.status(200).json({
      status: true,
      statusCode: res.statusCode,
      percentage,
      grade,
      totalmarks,
      scoredmarks,
      skills
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      statusCode: res.statusCode,
      message: "could not find the trainee",
      error
    });
  }
};
/**
 * @author : Rohan
 * @method : getaddperformance
 * @description : To fetch all the previous tests taken by mentor.
 * @return :
 * @param :[]
 */
exports.getAllTests = async (req, res, next) => {
  try {
    const tests = await Test.findAll();
    res.status(200).json({
      status: true,
      statusCode: res.statusCode,
      tests
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      statusCode: res.statusCode,
      message: "could not fetch tests",
      error
    });
  }
};
/**
 * @author : Rohan
 * @method : postaddperformance
 * @description : To create a performance of a particular trainee.
 * @return :
 * @param :[skills, totalmarks, obtainedmarks, trainee, test]
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
    res.status(201).json({
      status: true,
      statusCode: res.statusCode,
      newperformance
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      statusCode: res.statusCode,
      message: "not created performance",
      error
    });
  }
};
/**
 * @method : listOfTrainees
 * @author : Rohan
 * @description : To fetch all the trainees with particular department
 * @return :
 * @param :[departmentId]
 **/
exports.listOfTrainees = async (req, res, next) => {
  try {
    const trainees = await Trainee.findAll({
      where: { department_id: req.params.departmentId }
    });
    // console.log(trainees);
    res.status(200).json({
      status: true,
      statusCode: res.statusCode,
      trainees
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      statusCode: res.statusCode,
      message: "could not find trainees",
      error
    });
  }
};
/**
 * @method : findByName
 * @author : Rohan
 * @description : To fetch the trainee details by his/her name
 * @return :
 * @param :[name]
 **/
exports.findByName = async (req, res, next) => {
  try {
    const name = req.params.name;
    // console.log(name);
    const trainee = await Trainee.findAll({
      where: { name: { [Op.like]: `${name}%` } }
    });
    // console.log(trainee);
    res.status(200).json({
      status: true,
      statusCode: res.statusCode,
      trainee
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      statusCode: res.statusCode,
      message: "could not find trainee",
      error
    });
  }
};

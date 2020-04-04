const Trainee = require("../Models/trainee");
const Mentor = require("../Models/mentor");
const Department = require("../Models/department");
const Test = require("../Models/test");
const Performance = require("../Models/performance");
<<<<<<< HEAD
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
=======
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
>>>>>>> 31108d227dce1bcf2298d46e1fcb2f2f502e9826
    const createdtest = await Test.create({
      name: name,
      date: date,
      test_description: description,
      duration: duration,
      totalmarks: totalmarks
    });
<<<<<<< HEAD
    // console.log(createdtest);
    res.send("pass");
  } catch (error) {
    console.log(error.message);
=======
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
>>>>>>> 31108d227dce1bcf2298d46e1fcb2f2f502e9826
  }
};
/**
 * @author : Rohan
<<<<<<< HEAD
 * @method : getcheckperformance
 * @description : it helps to render the performance view to mentor with all trainee names.
 */
exports.getcheckperformance = async (req, res, next) => {
  const trainees = await Trainee.findAll();
  // console.log(trainees);
  res.render("performance", {
    trainees: trainees
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
=======
 * @method : postcheckperformance
 * @description : it helps to mentor for calculate the performance of individual trainee by
 * their marks grade and skills.
 * @return :
 * @param :[trainee]
 */
exports.postcheckperformance = async (req, res, next) => {
>>>>>>> 31108d227dce1bcf2298d46e1fcb2f2f502e9826
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
<<<<<<< HEAD
    // console.log(traineeRecords);
=======
>>>>>>> 31108d227dce1bcf2298d46e1fcb2f2f502e9826
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
<<<<<<< HEAD
    console.log("per " + percentage + "%");
    console.log("grade=" + grade);
    console.log("totalmarks=" + totalmarks);
    console.log("scoredmarks=" + scoredmarks);
    console.log("extra skills=" + skills);
    res.send("pass");
  } catch (error) {
    console.log(error);
=======
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
>>>>>>> 31108d227dce1bcf2298d46e1fcb2f2f502e9826
  }
};
/**
 * @author : Rohan
 * @method : getaddperformance
<<<<<<< HEAD
 * @description : it helps to render the addperformance view with required data from tTest
 *  and Trainee models.
 */
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
=======
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
>>>>>>> 31108d227dce1bcf2298d46e1fcb2f2f502e9826
  }
};
/**
 * @author : Rohan
 * @method : postaddperformance
<<<<<<< HEAD
 * @description : it helps to add the shills of a particular trainee by his mentor and
 * create a performance of a particular trainee.
=======
 * @description : To create a performance of a particular trainee.
 * @return :
 * @param :[skills, totalmarks, obtainedmarks, trainee, test]
>>>>>>> 31108d227dce1bcf2298d46e1fcb2f2f502e9826
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
<<<<<<< HEAD
    res.send("performance added successfully");
  } catch (error) {
    console.log(error);
=======
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
>>>>>>> 31108d227dce1bcf2298d46e1fcb2f2f502e9826
  }
};

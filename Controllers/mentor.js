const Trainee = require("../Models/trainee");
const Mentor = require("../Models/mentor");
const Department = require("../Models/department");
const Timelog = require("../Models/timelog");
const Test = require("../Models/test");
const Performance = require("../Models/performance");
const Sub_category = require("../Models/sub_category");
const Category = require("../Models/category");
const Auth = require("../Models/auth");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");

/**
 * @author : Rohan
 * @method : postaddtest
 * @description : To add a test by mentor.
 * @return :
 * @param :[name, date, description, duration, totalmarks]
 */
exports.postAddTest = async (req, res, next) => {
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
 * @description : To calculate the performance of individual trainee by
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
    const traineeId = req.body.traineeId;
    const traineeRecords = await Performance.findAll({
      where: {
        trainee_id: traineeId
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
exports.postAddPerformance = async (req, res, next) => {
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
/**
 * @method : sendMailToAllTrainees
 * @author : Rohan
 * @description : To send mail to all the trainees
 * @return :
 * @param :[text,mentorId]
 **/
exports.sendMailToAllTrainees = async (req, res, next) => {
  try {
    const emails = [],
      text = req.body.text,
      mentorId = parseInt(req.params.mentorId);
    let getmailoptions = require("../mail/mailoptions");
    const mentor = await Auth.findAll({
      attributes: ["email"],
      where: { id: mentorId }
    });
    let mentor_email = mentor[0].dataValues.email;
    // console.log(mentor_email);
    const trainees = await Trainee.findAll({
      where: { mentor_id: mentorId }
    });
    trainees.forEach(async trainee => {
      let authdata = await Auth.findAll({
        attributes: ["email"],
        where: { id: trainee.auth_id }
      });
      let email = authdata[0].dataValues.email;
      // console.log(authdata[0].dataValues.email);
      emails.push(email);
      mailOptions = getmailoptions(email, text);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
          //user:mentor_email,
          user: "rohanshrivastav1999@gmail.com",
          pass: "rohan0804" //mentor passsword
        }
      });
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(400).json({
            status: false,
            statusCode: res.statusCode,
            message: "could not send email to all trainees",
            error
          });
        } else {
          console.log(info.response);
          console.log("mail send successfullly");
        }
      });
    });
    res.status(200).json({
      status: true,
      statusCode: res.statusCode,
      trainees
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      statusCode: res.statusCode,
      message: "could not send mail to all trainees",
      error
    });
  }
};
/**
 * @method : sendMailToAllTrainees
 * @author : Rohan
 * @description : Mentor can check the timelog of a particular trainee
 * @return :
 * @param :[traineeId]
 **/
exports.checkTimelog = async (req, res, next) => {
  try {
    const traineeId = req.body.id;
    let data = [];
    const timelogData = await Timelog.findAll({
      where: { trainee_id: traineeId }
    });
    timelogData.forEach(async timelog => {
      let { start_time, end_time, date, task_memo } = timelog;
      if (timelog.dataValues.sub_category_id != null) {
        let sub_category = await Sub_category.findAll({
          attributes: ["name"],
          where: { id: timelog.dataValues.sub_category_id }
        });
        let category = await Category.findAll({
          attributes: ["name"],
          where: { id: timelog.dataValues.category_id }
        });
        data.push({
          end_time: timelog.dataValues.end_time,
          start_time: timelog.dataValues.start_time,
          task_memo: timelog.dataValues.task_memo,
          sub_category: sub_category[0].dataValues.name,
          category: category[0].dataValues.name
        });
      } else {
        let category = await Category.findAll({
          attributes: ["name"],
          where: { id: timelog.dataValues.category_id }
        });
        data.push({
          start_time: timelog.dataValues.start_time,
          end_time: timelog.dataValues.end_time,
          task_memo: timelog.dataValues.task_memo,
          category: category[0].dataValues.name
        });
      }
    });
    setTimeout(() => {
      res.status(200).json({
        status: true,
        statusCode: res.statusCode,
        data
      });
    }, 20);
  } catch (error) {
    res.status(400).json({
      status: false,
      statusCode: res.statusCode,
      message: "could not find the timelog of trainee",
      error
    });
  }
};

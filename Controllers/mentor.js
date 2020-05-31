const Trainee = require("../Models/trainee");
const Mentor = require("../Models/mentor");
const Department = require("../Models/department");
const Timelog = require("../Models/timelog");
const Test = require("../Models/test");
const Performance = require("../Models/performance");
const Sub_category = require("../Models/sub_category");
const Category = require("../Models/category");
const Auth = require("../Models/auth");
const Announcement = require("../Models/announcement");
const Leave = require("../Models/leave");
const Event = require("../Models/event");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const moment = require("moment");
const traineeDoubt = require("../Models/traineedoubt");
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
    const {
      name,
      date,
      description,
      duration,
      totalmarks,
      mentor_id,
    } = req.body;
    const createdtest = await Test.create({
      name: name,
      date: date,
      test_description: description,
      duration: duration,
      totalmarks: totalmarks,
      mentor_id: mentor_id,
    });
    res.status(201).json({
      status: true,
      statusCode: res.statusCode,
      createdtest,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      statusCode: res.statusCode,
      message: "could not create test",
      error,
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
    test_marks_array = [],
    scoredmarks = 0;
  try {
    const traineeId = req.body.traineeId;
    const mentorId = req.body.mentorId;
    const trainee = await Trainee.findOne({
      raw: true,
      where: { id: traineeId },
      attributes: ["name"],
    });
    console.log(trainee);
    traineeName = trainee.name;
    // console.log(mentorId);
    // console.log(traineeId);
    // const traineeRecords = await Performance.findAll({
    //   raw: true,
    //   where: {
    //     trainee_id: traineeId,
    //   },
    // });
    // console.log(traineeRecords);
    const tests = await Test.findAll({
      raw: true,
      where: { mentor_id: mentorId },
    });
    // console.log(tests);

    // traineeRecords.forEach((traineeRecord) => {
    //   skills.push(traineeRecord.extra_skills);
    // });
    for (test of tests) {
      totalmarks += test.totalmarks;
      test_marks = await Performance.findAll({
        raw: true,
        where: {
          [Op.and]: [{ trainee_id: traineeId }, { test_id: test.id }],
        },
      });
      if (test_marks[0]) {
        test_marks_array.push(test_marks[0].marks_obtained);
        scoredmarks += test_marks[0].marks_obtained;
      } else {
        test_marks_array.push("absent");
      }
    }
    //calculating the percentage
    percentage = ((scoredmarks * 100) / totalmarks).toFixed(2);
    if (percentage >= 90 && percentage <= 100) grade = "A";
    else if (percentage >= 80 && percentage <= 89) grade = "B";
    else if (percentage >= 60 && percentage <= 79) grade = "C";
    else if (percentage >= 33 && percentage <= 59) grade = "D";
    else if (percentage < 33) grade = "F";
    res.render("performance-new", {
      percentage,
      grade,
      totalmarks,
      scoredmarks,
      skills,
      tests,
      test_marks_array,
      scoredmarks,
      traineeName,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      statusCode: res.statusCode,
      message: "could not find the trainee",
      error,
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
      tests,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      statusCode: res.statusCode,
      message: "could not fetch tests",
      error,
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
      trainee_id: trainee,
    });
    res.status(201).json({
      status: true,
      statusCode: res.statusCode,
      newperformance,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      statusCode: res.statusCode,
      message: "not created performance",
      error,
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
      where: { department_id: req.params.departmentId },
    });
    // console.log(trainees);
    res.status(200).json({
      status: true,
      statusCode: res.statusCode,
      trainees,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      statusCode: res.statusCode,
      message: "could not find trainees",
      error,
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
      where: { name: { [Op.like]: `${name}%` } },
    });
    // console.log(trainee);
    res.status(200).json({
      status: true,
      statusCode: res.statusCode,
      trainee,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      statusCode: res.statusCode,
      message: "could not find trainee",
      error,
    });
  }
};

/**
 * @method : getLeaveRecords
 * @author : Mehak Dhiman
 * @description : To Retrive all data
 * @return :
 * @param :[params-trainee_id]
 *
 **/
exports.getSendEmail = async (req, res, next) => {
  res.render("sendemail");
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
    // console.log(req.body);
    const emails = [],
      text = req.body.mailtext,
      mentorId = parseInt(req.params.mentorId);
    let getmailoptions = require("../mail/mailoptions");
    const mentor = await Auth.findAll({
      attributes: ["email"],
      where: { id: mentorId },
    });
    let mentor_email = mentor[0].dataValues.email;
    // console.log(mentor_email);
    const trainees = await Trainee.findAll({
      where: { mentor_id: mentorId },
    });
    trainees.forEach(async (trainee) => {
      let authdata = await Auth.findAll({
        attributes: ["email"],
        where: { id: trainee.auth_id },
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
          pass: "rohan0804", //mentor passsword
        },
      });
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(400).json({
            status: false,
            statusCode: res.statusCode,
            message: "could not send email to all trainees",
            error,
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
      trainees,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      statusCode: res.statusCode,
      message: "could not send mail to all trainees",
      error,
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
    const traineeId = req.body.traineeId;
    let data = [];
    const timelogData = await Timelog.findAll({
      raw: true,
      order: [["date", "DESC"]],
      where: { trainee_id: traineeId },
    });
    for (timelog of timelogData) {
      console.log(timelog);
      if (timelog.sub_category_id != null) {
        let sub_category = await Sub_category.findAll({
          raw: true,
          attributes: ["name"],
          where: { id: timelog.sub_category_id },
        });
        let category = await Category.findAll({
          raw: true,
          attributes: ["name"],
          where: { id: timelog.category_id },
        });
        data.push({
          date: timelog.date,
          end_time:
            timelog.end_time.getDate() +
            " " +
            timelog.end_time.getMonth() +
            " " +
            timelog.end_time.getFullYear() +
            " " +
            timelog.end_time.toLocaleTimeString(),
          start_time:
            timelog.start_time.getDate() +
            " " +
            timelog.start_time.getMonth() +
            " " +
            timelog.start_time.getFullYear() +
            " " +
            timelog.start_time.toLocaleTimeString(),
          task_memo: timelog.task_memo,
          sub_category: sub_category[0].name,
          category: category[0].name,
        });
      } else {
        let category = await Category.findAll({
          raw: true,
          attributes: ["name"],
          where: { id: timelog.category_id },
        });
        data.push({
          date: timelog.date,
          start_time:
            timelog.start_time.getDate() +
            " " +
            timelog.start_time.getMonth() +
            " " +
            timelog.start_time.getFullYear() +
            " " +
            timelog.start_time.toLocaleTimeString(),
          end_time:
            timelog.end_time.getDate() +
            " " +
            timelog.end_time.getMonth() +
            " " +
            timelog.end_time.getFullYear() +
            " " +
            timelog.end_time.toLocaleTimeString(),
          task_memo: timelog.task_memo,
          category: category[0].name,
        });
      }
    }
    // res.status(200).json({
    //   status: true,
    //   statusCode: res.statusCode,
    //   data,
    // });
    res.render("trainee-timelogdata", {
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      statusCode: res.statusCode,
      message: "could not find the timelog of trainee",
      error,
    });
  }
};

/**
 * @method : getAddDepartment
 * @author : Rohan
 * @description : To render the form for adding a department
 * @return :
 * @param :[]
 **/

exports.getAddDepartment = async (req, res, next) => {
  res.render("department");
};
/**
 * @method : postAddDeprtment
 * @author : Rohan
 * @description : To add a department
 * @return :
 * @param :[traineeId]
 **/
exports.postAddDeprtment = async (req, res, next) => {
  try {
    const { name, head } = req.body;
    const syllabuss = req.file;
    const syllabussurl = syllabuss.path;
    if (!syllabuss) {
      res.status(400).json({
        status: false,
        statusCode: res.statusCode,
        message: "format of file is not correct",
      });
    }
    const department = await Department.create({
      name: name,
      syllabus: syllabussurl,
      department_head: head,
    });
    res.status(201).json({
      status: true,
      statusCode: res.statusCode,
      department,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      statusCode: res.statusCode,
      message: "could not add a department",
      error,
    });
  }
};

/**
 * @method : getDashboard
 * @author : Rohan
 * @description : To render the mentor's dashboard
 * @return :
 * @param :[]
 **/

exports.getDashboard = async (req, res, next) => {
  try {
    const traineeNames = await Trainee.findAll({
      raw: true,
      attributes: ["id", "name"],
      where: { mentor_id: 1 },
    });
    // console.log(traineeNames);
    const announcements = await Announcement.findAll({
      raw: true,
      order: [["id", "DESC"]],
      attributes: ["announcementTitle", "announcementDescription", "createdAt"],
    });
    // console.log(announcements);
    const events = await Event.findAll({
      raw: true,
      order: [["id", "DESC"]],
      attributes: ["heading", "date"],
    });
    // console.log(events);
    res.render("mentor-dashboard", {
      traineeNames,
      announcements,
      events,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      statusCode: res.statusCode,
      error,
    });
  }
};

/**
 * @method : getAddTest
 * @author : Rohan
 * @description : To render the test view to mentor for adding a test
 * @return :
 * @param :[]
 **/

exports.getAddTest = async (req, res, next) => {
  res.render("test");
};

/**
 * @method : getPerformance
 * @author : Rohan
 * @description : To render the addperformance view to mentor for adding a
 * performance of a particular trainee
 * @return :
 * @param :[]
 **/

exports.getPerformance = async (req, res, next) => {
  try {
    // console.log(req.params.mentorId);
    const mentorId = req.params.mentorId;
    const trainees = await Trainee.findAll({ where: { mentor_id: mentorId } });
    const tests = await Test.findAll({ where: { mentor_id: mentorId } });
    res.render("addperformance", {
      trainees,
      tests,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      statusCode: res.statusCode,
      error,
    });
  }
};

/**
 * @method : getTraineeTimelog
 * @author : Rohan
 * @description : To render the view  to mentor for select the trainee
 * @return :
 * @param :[]
 **/

exports.getTraineeTimelog = async (req, res, next) => {
  try {
    // console.log(req.params.mentorId);
    const mentorId = req.params.mentorId;
    const trainees = await Trainee.findAll({ where: { mentor_id: mentorId } });
    // console.log(trainees);
    res.render("trainee-timelog", {
      trainees,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      statusCode: res.statusCode,
      error,
    });
  }
};

/**
 * @method : getLeaveRecords
 * @author : Mehak Dhiman
 * @description : To Retreive all data
 * @return :
 * @param :[params-trainee_id]
 *
 **/

exports.getLeaveRecords = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    if (!id) {
      res.status(400).json({
        msg: "Parameter not found",
      });
    }
    const mentorData = await Mentor.findOne({
      where: { id: id },
    });
    if (!mentorData) {
      res.status(400).json({
        msg: "Record not Exist",
      });
    }
    const traineeData = await Trainee.findAll({
      where: { mentor_id: id },
    });
    if (!traineeData) {
      res.status(400).json({
        msg: "Trainees records not Exist",
      });
    }
    let traineeId = traineeData.map(function (trainee_id) {
      return trainee_id.id;
    });
    // console.log(traineeId);
    let traineename = traineeData.map(function (trainee_name) {
      return trainee_name.name;
    });

    const leaveRecords = await Leave.findAll({
      where: { trainee_id: [traineeId] },
    });

    if (leaveRecords) {
      res.render("traineesLeaveList", {
        leaveRecords,
        traineename,
        moment: moment,
      });
    } else {
      res.status(400).json({
        msg: "Something went wrong",
      });
    }
  } catch (err) {
    res.status(400).json({
      msg: "Something Wrong!",
    });
  }
};

exports.getCheckPerfromance = async (req, res, next) => {
  const mentorId = req.params.mentorId;
  const trainees = await Trainee.findAll({ where: { mentor_id: mentorId } });
  res.render("performance", {
    trainees,
  });
};


exports.getTraineeDoubts = async (req, res, next) => {
  const traineedoubts = await traineeDoubt.findAll();
  const traineedoubtresult = traineedoubts.map((traineedoubt) => {
    return traineedoubt.dataValues;
  });

  res.render("mentordoubtreply", {
    traineedoubts: traineedoubtresult,
  });
};


exports.posttraineeDoubts = async (req, res, next) => {
  try {
    console.log("sent query by ajax request");
    const { answer } = req.body;
    console.log(answer);
    mentorId = 6;
    const mentor = await Mentor.findOne({ where: { id: mentorId } });
    const trainee = await Trainee.findAll({ where: { department_id: mentor.department_id } });
    traineeDoubt.update(
      { answers: answer },
      { where: { answers: 'NULL' } }
    )
      .then(result =>
        handleResult(result)
      )
      .catch(err =>
        handleError(err)
      )
    
    io.getio().emit("getDoubtAnswer", { answers });
   
    res.status(200).json({ status: "Send Doubts Answer!" });
  } catch (error) {
    res.status(400).json({ error: error.stack });
  }
};
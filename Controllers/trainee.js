const Trainee = require("../Models/trainee");
const Category = require("../Models/category");
const subCategory = require("../Models/sub_category");
const Timelog = require("../Models/timelog");
const traineeDoubt = require("../Models/traineedoubt");
var io = require("../socket");
const Announcement = require("../Models/announcement");
const Event = require("../Models/event");
const Notification = require("../Models/notifications");

const { Op } = require("sequelize");
const transporter = require("../utils/mailConfigration");
const config = require("../utils/mailConf");
const moment = require("moment");
/**
 * @method : gettraineeDoubts
 * @author : Taranjeet
 * @description : Trainee should be ask doubts to mentor.
 * @return :
 * @param : [params]
 */
exports.gettraineeDoubts = async (req, res, next) => {
  res.render("trainee-doubts");
};

exports.posttraineeDoubts = async (req, res, next) => {
  try {
    console.log("sent query by ajax request");
    const { topic, questions } = req.body;
    console.log(topic);
    console.log(questions);
    const doubt = await traineeDoubt.create({
      questions: questions,
      //   trainee_id: traineeId,
      topic: topic,
    });
    console.log("sent");
    traineeId = 6;
    const trainee = await Trainee.findOne({ where: { id: traineeId } });
    io.getio().emit("getTraineeDoubt", { doubt, mentor_id: trainee.mentor_id });
    console.log(trainee.mentor_id);
    res.status(200).json({ status: "Send Doubts!" });
  } catch (error) {
    res.status(400).json({ error: error.stack });
  }
};

/**
 * @method : postLeave
 * @author : Mehak Dhiman
 * @description : To add leave record
 * @return :
 * @param :
 */

exports.postLeave = async (data) => {
  const traineeData = await Trainee.findOne({
    where: { id: 5 }, //change id from login credientions
  });
  if (!traineeData) {
    throw new Error("Trainee data not found");
  }

  const mentorData = await Mentor.findOne({
    where: { id: traineeData.mentor_id },
  });

  const dateRecord = await Leave.findOne({
    where: {
      trainee_id: traineeData.id,
      [Op.or]: [
        {
          [Op.and]: {
            start_date: { [Op.eq]: data.start_date },
            end_date: { [Op.eq]: data.end_date },
          },
        },
        {
          [Op.and]: {
            start_date: { [Op.gt]: data.start_date },
            end_date: { [Op.lt]: data.end_date },
          },
        },
        {
          [Op.and]: {
            end_date: { [Op.gt]: data.start_date, [Op.lt]: data.end_date },
          },
        },
        {
          [Op.and]: {
            start_date: { [Op.lt]: data.start_date },
            end_date: { [Op.gt]: data.start_date },
          },
        },
        {
          [Op.and]: {
            start_date: { [Op.lt]: data.end_date },
            end_date: { [Op.gt]: data.end_date },
          },
        },
      ],
    },
  });
  if (dateRecord) {
    return {
      status: 400,
      data: {
        msg: "Leave already exist.",
      },
    };
  }
  let mailOptions = {
    from: config.from,
    to: mentorData.mail_id,
    subject: data.subject,
    text: data.reason,
  };

  const LeaveRecord = await Leave.create({
    start_date: data.start_date,
    end_date: data.end_date,
    subject: data.subject,
    reason: data.reason,
    trainee_id: traineeData.id,
  });
  if (LeaveRecord) {
    //await transporter.sendMail(mailOptions);

    return {
      status: 200,
      data: {
        msg: "Record added successfully",
      },
    };
  }

  throw new Error("Something went wrong!");
  // moment(scope.modelValue, 'DD-MMM-YYYY HH:mm a', true).isValid()
};

// exports.postCategory = async (req, res) => {
//     const { category, subCategory } = req.body;
//     const Category = await Category.create({
//         name: category
//     })
//     const SubCategory = await subCategory.create({
//         name: subCategory
//     });
// }
// exports.postTimelog = async (req, res, next) => {
//     const { start_time, end_time, date, task_memo } = req.body;
//     const categoryID = await Category.findOne({ where: { name: name } });
//     const Timelog = await Timelog.create({
//         start_time,
//          end_time,
//           date,
//           task_memo,
//            categoryname=categoryID.dataValues.name,
//            subCategory=categoryID.dataValues.subCategoryname
//     })
// }

exports.gettraineeDashboard = async (req, res) => {
  const events = await Event.findAll();
  const announcements = await Announcement.findAll();
  const notifications = await Notification.findAll();
  const traineedoubts = await traineeDoubt.findAll();
  const eventsresult = events.map((event) => {
    return event.dataValues;
  });
  const announcementresult = announcements.map((announcement) => {
    return announcement.dataValues;
  });
  const notificationresult = notifications.map((notification) => {
    return notification.dataValues;
  });
  const traineedoubtresult = traineedoubts.map((traineedoubt) => {
    return traineedoubt.dataValues;
  });

  res.render("traineeDashboard", {
    events: eventsresult,
    announcements: announcementresult,
    notifications: notificationresult,
    traineedoubts: traineedoubtresult,
  });
};


exports.getPerformance=async (req,res,next)=>{
  let totalmarks = 0,
    skills = [],
    percentage = 0,
    grade = "",
    test_marks_array = [],
    scoredmarks = 0;
  try {
    const traineeId = req.authId;
    const mentorId = await Trainee.findOne({
      raw: true,
      where: { id: traineeId },
    });;
    const trainee = await Trainee.findOne({
      raw: true,
      where: { id: traineeId },
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
    res.render("traineeperformance", {
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
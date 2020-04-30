const Trainee = require('../Models/trainee');
const Category = require('../Models/category');
const subCategory = require('../Models/sub_category');
const Timelog = require('../Models/timelog');
const traineeDoubt = require('../Models/traineedoubt');
var io = require('../socket');
const Announcement = require('../Models/announcement');
const Event = require('../Models/event');
const Notification = require('../Models/notifications');

/**
 * @method : gettraineeDoubts
 * @author : Taranjeet
 * @description : Trainee should be ask doubts to mentor.
 * @return :
 * @param : [params]
 */
exports.gettraineeDoubts = async (req, res, next) => {
  res.render('trainee-doubts');
}

exports.posttraineeDoubts = async (req, res, next) => {
  try {
    console.log("sent query by ajax request");
    const { topic, questions } = req.body;
    console.log(topic);
    console.log(questions);
    const doubt = await traineeDoubt.create({
      questions: questions,
      //   trainee_id: traineeId,
      topic: topic
    });
    console.log("sent");
    traineeId = 6;
    const trainee = await Trainee.findOne({ where: { id: traineeId } });
    io.getio().emit('getTraineeDoubt', { doubt, mentor_id: trainee.mentor_id });
    console.log(trainee.mentor_id);
    res.status(200).json({ status: 'Send Doubts!' });
  } catch (error) {
    res.status(400).json({ error: error.stack });
  }
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
  const eventsresult = events.map(event => {
    return event.dataValues
  });
  const announcementresult = announcements.map(announcement => {
    return announcement.dataValues
  });
  const notificationresult = notifications.map(notification => {
    return notification.dataValues
  });
  const traineedoubtresult = traineedoubts.map(traineedoubt => {
    return traineedoubt.dataValues
  })

  console.log(traineedoubtresult);
  res.render('traineeDashboard', {
    events: eventsresult,
    announcements: announcementresult,
    notifications: notificationresult,
    traineedoubts: traineedoubtresult,
  });
};

const Trainee = require('../Models/trainee');
const Category = require('../Models/category');
const subCategory = require('../Models/sub_category');
const Timelog = require('../Models/timelog');
const traineeDoubt = require('../Models/traineedoubt');
var io = require('../socket');

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
    traineeId = 2;
    const message = req.body;
    console.log(message.message);
    const doubt = await traineeDoubt.create({
      questions: message.message,
    });
    const trainee = await Trainee.findOne({ where: { id: traineeId } });
    io.getio().emit('getTraineeDoubt',{
      doubt : doubt,
      mentorId : trainee.mentor_id
    });
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

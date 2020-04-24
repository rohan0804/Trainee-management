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
    traineeId = 6;
    const message = req.body;
    console.log(message.message);
    const doubt = await traineeDoubt.create({
      questions: message.message,
    });
   
    const trainee = await Trainee.findOne({ where: { id: traineeId } });
    io.getio().emit('get',"Hekko");
    console.log(trainee.mentor_id);
    res.status(200).json({ status: 'Send Doubts!' });
  } catch (error) {
    res.status(400).json({ error: error.stack });
  }
};


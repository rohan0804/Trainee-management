const Trainee = require("../Models/trainee");
const Category = require("../Models/category");
const subCategory = require("../Models/sub_category");
const Timelog = require("../Models/timelog");
const { Op } = require("sequelize");
/**
 * @method : postTimelog
 * @author : Mehak Dhiman
 * @description : Timelog api with PostTimelog method for insert data [Expected DATE in UTC format]
 * @return :
 * @param :
 */

exports.postTimelog = async data => {
  try {
    const categoryData = await Category.findOne({
      where: { id: data.category_id }
    });
    if (!categoryData) {
      return {
        status: 400,
        data: {
          msg: "category not found"
        }
      };
    }
    const subCategoryData = await subCategory.findOne({
      where: { id: data.sub_category_id }
    });
    if (!subCategoryData) {
      return {
        status: 400,
        data: {
          msg: " sub category not found"
        }
      };
    }
    const traineeData = await Trainee.findOne({
      where: { id: data.trainee_id }
    });
    if (!traineeData) {
      return {
        status: 400,
        data: {
          msg: "trainee data not found"
        }
      };
    }
    // Time slot check on time
    const startTimeCheck = await Timelog.findOne({
      where: {
        trainee_id: data.trainee_id,
        date: data.date,
        [Op.or]: [
          {
            [Op.and]: {
              start_time: { [Op.eq]: data.start_time },
              end_time: { [Op.eq]: data.end_time }
            }
          },
          {
            [Op.and]: {
              start_time: { [Op.gt]: data.start_time },
              end_time: { [Op.lt]: data.end_time }
            }
          },
          {
            [Op.and]: {
              end_time: { [Op.gt]: data.start_time, [Op.lt]: data.end_time }
            }
          },
          {
            [Op.and]: {
              start_time: { [Op.lt]: data.start_time },
              end_time: { [Op.gt]: data.start_time }
            }
          },
          {
            [Op.and]: {
              start_time: { [Op.lt]: data.end_time },
              end_time: { [Op.gt]: data.end_time }
            }
          }
        ]
      }
    });
    if (startTimeCheck) {
      return {
        status: 400,
        data: {
          msg: "time slot already exist"
        }
      };
    }

    const Timelogg = await Timelog.create({
      start_time: data.start_time,
      end_time: data.end_time,
      date: data.date,
      task_memo: data.task_memo,
      trainee_id: traineeData.id,
      category_id: categoryData.id,
      sub_category_id: subCategoryData.id
    });
    if (Timelogg) {
      return {
        status: 200,
        data: {
          msg: "Record added successfully"
        }
      };
    }
    return {
      status: 400,
      data: {
        msg: "something went wrong"
      }
    };
  } catch (e) {
    console.log(e);
    return {
      status: 400,
      data: {
        msg: "Something went wrong!"
      }
    };
  }
};

/**
 * @method : getTimelogData
 * @author : Mehak Dhiman
 * @description : To Retrive all data by trainee id
 * @return :
 * @param :[params-trainee_id]
 *
 **/

exports.getTimelogData = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({
        msg: "parameter not found"
      });
    }
    const timelogData = await Timelog.findOne({
      where: { trainee_id: id }
    });
    if (!timelogData) {
      res.status(400).json({
        msg: "Record not Exist"
      });
    }
    const timelogRecords = await Timelog.findAll({ where: { trainee_id: id } });
    if (timelogRecords) {
      res.send(timelogRecords);
    }
    res.status(400).json({
      msg: "Something went wrong"
    });
  } catch (err) {
    res.status(400).json({
      msg: "Something Wrong"
    });
  }
};

/**
 * @method : deleteTimelog
 * @author : Mehak Dhiman
 * @description : To Delete Record
 * @return :
 * @param :[params- id,trainee_id]
 **/

exports.deleteTimelog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const trainee_id = req.params.trainee_id;

    const timelogData = await Timelog.findOne({
      where: { [Op.and]: [{ trainee_id: trainee_id }, { id: id }] }
    });
    if (!timelogData) {
      res.status(400).json({
        msg: "Record not Exist"
      });
    }
    const deleteTimelog = await Timelog.destroy({
      where: { [Op.and]: [{ trainee_id: trainee_id }, { id: id }] }
    });
    if (deleteTimelog) {
      res.status(200).json({
        msg: "record deleted successfully"
      });
    }
    res.status(400).json({
      msg: "Something went wrong"
    });
  } catch (error) {
    res.status(400).json({
      msg: "Something  wrong"
    });
  }
};

/**
 * @method : updateTimelogRecord
 * @author : Mehak Dhiman
 * @description : To Update Record BY id and trainee_id
 * @return :
 * @param :[params- id,trainee_id]
 **/

exports.updateTimelogRecord = async (req, res, next) => {
  try {
    const id = req.params.id;
    const trainee_id = req.params.trainee_id;

    const timelogData = await Timelog.findOne({
      where: { [Op.and]: [{ trainee_id: trainee_id }, { id: id }] }
    });
    if (!timelogData) {
      res.status(400).json({
        msg: "Record not found"
      });
    }
    const updatedTimelog = await timelogData.update({
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      date: req.body.date,
      task_memo: req.body.task_memo,
      category_id: req.body.category_id,
      sub_category_id: req.body.sub_category_id
    });
    if (updatedTimelog) {
      res.status(200).json({
        msg: "timelog record updated successfully"
      });
    }
    res.status(400).json({
      msg: "Something  went wrong"
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Something  wrong"
    });
  }
};

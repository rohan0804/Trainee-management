const Trainee = require("../Models/trainee");
const Category = require("../Models/category");
const subCategory = require("../Models/sub_category");
const Timelog = require("../Models/timelog");
const { Op } = require("sequelize");
/**
 * @method : postTimelog
 * @author : Mehak Dhiman
 * @description : Timelog api  with PostTimelog method for insert data[Expected DATE in UTC format]
 * @return :
 * @param :
 */

exports.postTimelog = async (req, res, next) => {
  try {
    const categoryData = await Category.findOne({
      where: { id: req.body.category_id }
    });
    if (!categoryData) {
      res.status(400).json({
        msg: "category not found"
      });
    }
    const subCategoryData = await subCategory.findOne({
      where: { id: req.body.sub_category_id }
    });
    if (!subCategoryData) {
      res.status(400).json({
        msg: "sub category not found"
      });
    }
    const traineeData = await Trainee.findOne({
      where: { id: req.body.trainee_id }
    });
    if (!traineeData) {
      res.status(400).json({
        msg: "trainee data not found"
      });
    }

    const Timelogg = await Timelog.create({
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      task_memo: req.body.task_memo,
      trainee_id: traineeData.id,
      category_id: categoryData.id,
      sub_category_id: subCategoryData.id
    });
    if (Timelogg) {
      res.status(200).json({
        msg: "record added successfully"
      });
    }
    res.status(400).json({
      msg: "Something went wrong"
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      msg: "Something Wrong"
    });
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

const Trainee = require("../Models/trainee");
const Category = require("../Models/category");
const subCategory = require("../Models/sub_category");
const Timelog = require("../Models/timelog");

/**
 * @method : postTimelog
 * @author : Mehak Dhiman
 * @description : Timelog api  with PostTimelog method fro insert data
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

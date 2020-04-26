const Trainee = require("../Models/trainee");
const Category = require("../Models/category");
const subCategory = require("../Models/sub_category");
const Timelog = require("../Models/timelog");
const Leave = require("../Models/leave");
const { Op } = require("sequelize");
/**
 * @method : postTimelog
 * @author : Mehak Dhiman
 * @description : Timelog api with PostTimelog method for insert data [Expected DATE in UTC format]
 * @return :
 * @param :
 */

// Date validation while inserting upadating  and deleting Record
// date.setDate(date.getDate() + 1);

exports.postTimelog = async (data) => {
  const categoryData = await Category.findOne({
    where: { id: data.category_id },
  });
  if (!categoryData) {
    throw new Error("Category not found");
  }
  const subCategoryData = await subCategory.findOne({
    where: { id: data.sub_category_id },
  });
  if (!subCategoryData) {
    throw new Error("Sub category not found");
  }
  const traineeData = await Trainee.findOne({
    where: { id: data.trainee_id },
  });
  if (!traineeData) {
    throw new Error("Trainee data not found");
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
            end_time: { [Op.eq]: data.end_time },
          },
        },
        {
          [Op.and]: {
            start_time: { [Op.gt]: data.start_time },
            end_time: { [Op.lt]: data.end_time },
          },
        },
        {
          [Op.and]: {
            end_time: { [Op.gt]: data.start_time, [Op.lt]: data.end_time },
          },
        },
        {
          [Op.and]: {
            start_time: { [Op.lt]: data.start_time },
            end_time: { [Op.gt]: data.start_time },
          },
        },
        {
          [Op.and]: {
            start_time: { [Op.lt]: data.end_time },
            end_time: { [Op.gt]: data.end_time },
          },
        },
      ],
    },
  });
  if (startTimeCheck) {
    return {
      status: 400,
      data: {
        msg: "Time slot already exist",
      },
    };
  }

  const Timelogg = await Timelog.create({
    start_time: data.start_time,
    end_time: data.end_time,
    date: data.date,
    task_memo: data.task_memo,
    trainee_id: traineeData.id,
    category_id: categoryData.id,
    sub_category_id: subCategoryData.id,
  });
  if (Timelogg) {
    return {
      status: 200,
      data: {
        msg: "Record added successfully",
      },
    };
  }
  throw new Error("Something went wrong!");
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
  const id = req.params.id;
  if (!id) {
    throw new Error("Parameter not found");
  }
  const timelogData = await Timelog.findOne({
    where: { trainee_id: id },
  });
  if (!timelogData) {
    res.status(400).json({
      msg: "Record not Exist",
    });
  }
  const timelogRecords = await Timelog.findAll({ where: { trainee_id: id } });
  if (timelogRecords) {
    res.send(timelogRecords);
  }
  throw new Error("Something went wrong!");
};

/**
 * @method : deleteTimelog
 * @author : Mehak Dhiman
 * @description : To Delete Record
 * @return :
 * @param :[params- id,trainee_id]
 **/

exports.deleteTimelog = async (req, res, next) => {
  const id = req.params.id;
  const trainee_id = req.params.trainee_id;

  const timelogData = await Timelog.findOne({
    where: { [Op.and]: [{ trainee_id: trainee_id }, { id: id }] },
  });
  if (!timelogData) {
    res.status(400).json({
      msg: "Record not Exist",
    });
  }
  const deleteTimelog = await Timelog.destroy({
    where: { [Op.and]: [{ trainee_id: trainee_id }, { id: id }] },
  });
  if (deleteTimelog) {
    res.status(200).json({
      msg: "Record deleted successfully",
    });
  }
  throw new Error("Something went wrong!");
};

/**
 * @method : updateTimelogRecord
 * @author : Mehak Dhiman
 * @description : To Update Record BY id and trainee_id
 * @return :
 * @param :[params- id,trainee_id,date]
 **/

exports.updateTimelogRecord = async (params, data) => {
  const id = params.id;
  const trainee_id = params.trainee_id;

  const timelogData = await Timelog.findOne({
    where: {
      [Op.and]: [{ trainee_id: trainee_id }, { id: id }],
    },
  });
  if (!timelogData) {
    return {
      status: 400,
      data: {
        msg: "Record not found",
      },
    };
  }

  // Time slot check on time
  const startTimeCheck = await Timelog.findOne({
    where: {
      id: { [Op.ne]: params.id },
      trainee_id: params.trainee_id,

      date: params.date,

      [Op.or]: [
        {
          [Op.and]: {
            start_time: { [Op.eq]: data.start_time },
            end_time: { [Op.eq]: data.end_time },
          },
        },
        {
          [Op.and]: {
            start_time: { [Op.gt]: data.start_time },
            end_time: { [Op.lt]: data.end_time },
          },
        },
        {
          [Op.and]: {
            end_time: {
              [Op.gt]: data.start_time,
              [Op.lt]: data.end_time,
            },
          },
        },
        {
          [Op.and]: {
            start_time: { [Op.lt]: data.start_time },
            end_time: { [Op.gt]: data.start_time },
          },
        },
        {
          [Op.and]: {
            start_time: { [Op.lt]: data.end_time },
            end_time: { [Op.gt]: data.end_time },
          },
        },
      ],
    },
  });
  if (startTimeCheck) {
    console.log("error");
    return {
      status: 400,
      data: {
        msg: "Time slot already exist",
      },
    };
  }

  const updatedTimelog = await timelogData.update({
    start_time: data.start_time,
    end_time: data.end_time,
    date: data.date,
    task_memo: data.task_memo,
    category_id: data.category_id,
    sub_category_id: data.sub_category_id,
  });
  if (updatedTimelog) {
    return {
      status: 200,
      data: {
        msg: "Record updated successfully",
      },
    };
  }
  throw new Error("Something went wrong!");
};

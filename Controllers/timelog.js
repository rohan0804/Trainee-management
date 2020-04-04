<<<<<<< HEAD
const Trainee=require('../Models/trainee');
const Category=require('../Models/category');
const subCategory=require('../Models/sub_category');
const Timelog=require('../Models/timelog');


exports.postCategory=async (req,res,next)=>{
    const {categoryname, subCategoryname}=req.body;
    const Categoryname=await Category.create({
        categoryname
    })
    const subCatgoryname=await subCategory.create({
        subCategoryname
    })
};

exports.postTimelog=async (req,res,next)=>{
    const {start_time,end_time,date,task_memo,categoryID,subcategoryID,TraineeId}=req.body;
    const categoryID=await Category.findOne({where:{name:name}});
    const subcategoryID=await subCategory.findOne({where:{name:name}});
    const TraineeId=await Trainee.findOne({where:{id:id}});
    const Timelog=await Timelog.create({
        start_time,end_time,date,task_memo,TraineeId:TraineeId.dataValues.id,categoryname:categoryID.dataValues.name,subCategory:subcategoryID.dataValues.subCategoryname
    })
}
=======
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

exports.postTimelog = async data => {
  try {
    const categoryData = await Category.findOne({
      where: { id: data.category_id }
    });
    if (!categoryData) {
      return {
        status: 400,
        data: {
          msg: "Category not found"
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
          msg: " Sub category not found"
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
          msg: "Trainee data not found"
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
          msg: "Time slot already exist"
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
        msg: "Something went wrong"
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
        msg: "Parameter not found"
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
      msg: "Something Wrong!"
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
        msg: "Record deleted successfully"
      });
    }
    res.status(400).json({
      msg: "Something went wrong"
    });
  } catch (error) {
    res.status(400).json({
      msg: "Something  wrong!"
    });
  }
};

/**
 * @method : updateTimelogRecord
 * @author : Mehak Dhiman
 * @description : To Update Record BY id and trainee_id
 * @return :
 * @param :[params- id,trainee_id,date]
 **/

exports.updateTimelogRecord = async (params, data) => {
  try {
    const id = params.id;
    const trainee_id = params.trainee_id;

    const timelogData = await Timelog.findOne({
      where: {
        [Op.and]: [{ trainee_id: trainee_id }, { id: id }]
      }
    });
    if (!timelogData) {
      return {
        status: 400,
        data: {
          msg: "Record not found"
        }
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
              end_time: {
                [Op.gt]: data.start_time,
                [Op.lt]: data.end_time
              }
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
      console.log("error");
      return {
        status: 400,
        data: {
          msg: "Time slot already exist"
        }
      };
    }

    const updatedTimelog = await timelogData.update({
      start_time: data.start_time,
      end_time: data.end_time,
      date: data.date,
      task_memo: data.task_memo,
      category_id: data.category_id,
      sub_category_id: data.sub_category_id
    });
    if (updatedTimelog) {
      return {
        status: 200,
        data: {
          msg: "Record updated successfully"
        }
      };
    }
    return {
      status: 400,
      data: {
        msg: "Something went wrong"
      }
    };
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      data: {
        msg: "Something went worng!"
      }
    };
  }
};
>>>>>>> 31108d227dce1bcf2298d46e1fcb2f2f502e9826

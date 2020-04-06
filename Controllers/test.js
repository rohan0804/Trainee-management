const Trainee = require("../Models/trainee");
const Mentor = require("../Models/mentor");
const Test = require("../Models/test");
const { Op } = require("sequelize");

/**
 * @method : postTest
 * @author : Mehak Dhiman
 * @description : To add test record
 * @return :
 * @param :
 */

exports.postTest = async (data) => {
  try {
    const traineeData = await Trainee.findOne({
      where: { id: data.trainee_id },
    });
    if (!traineeData) {
      return {
        status: 400,
        data: {
          msg: "Trainee data not found",
        },
      };
    }
    const mentorData = await Mentor.findOne({
      where: { id: data.mentor_id },
    });
    if (!mentorData) {
      return {
        status: 400,
        data: {
          msg: "Mentor data not found",
        },
      };
    }

    const testRecord = await Test.create({
      test_name: data.test_name,
      date: data.date,
      total_marks: data.total_marks,
      obtained_marks: data.obtained_marks,
      duration: data.duration,
      trainee_id: traineeData.id,
      mentor_id: mentorData.id,
    });
    if (testRecord) {
      return {
        status: 200,
        data: {
          msg: "Record added successfully",
        },
      };
    }
    return {
      status: 400,
      data: {
        msg: "Something went wrong",
      },
    };
  } catch (e) {
    console.log(e);
    return {
      status: 400,
      data: {
        msg: "Something went wrong!",
      },
    };
  }
};

/**
 * @method : getTest
 * @author : Mehak Dhiman
 * @description : To Retrive all data
 * @return :
 * @param :[params-trainee_id]
 *
 **/

exports.getTest = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({
        msg: "Parameter not found",
      });
    }
    const traineegData = await Trainee.findOne({
      where: { id: id },
    });
    if (!traineegData) {
      res.status(400).json({
        msg: "Record not Exist",
      });
    }
    const testRecords = await Test.findAll({ where: { trainee_id: id } });
    if (testRecords) {
      res.send(testRecords);
    }
    res.status(400).json({
      msg: "Something went wrong",
    });
  } catch (err) {
    res.status(400).json({
      msg: "Something Wrong!",
    });
  }
};

/**
 * @method : deleteTest
 * @author : Mehak Dhiman
 * @description : To Delete Record
 * @return :
 * @param :[params- id,trainee_id]
 **/

exports.deleteTest = async (req, res) => {
  try {
    const id = req.params.id;
    const trainee_id = req.params.trainee_id;

    const testData = await Test.findOne({
      where: { [Op.and]: [{ trainee_id: trainee_id }, { id: id }] },
    });
    if (!testData) {
      res.status(400).json({
        msg: "Record not Exist",
      });
    }
    const deleteTestRecord = await Test.destroy({
      where: { [Op.and]: [{ trainee_id: trainee_id }, { id: id }] },
    });
    if (deleteTestRecord) {
      res.status(200).json({
        msg: "Record deleted successfully",
      });
    }
    res.status(400).json({
      msg: "Something went wrong",
    });
  } catch (error) {
    res.status(400).json({
      msg: "Something  wrong!",
    });
  }
};

/**
 * @method : updateTestRecord
 * @author : Mehak Dhiman
 * @description : To Update Record BY id and trainee_id
 * @return :
 * @param :[params- id,trainee_id]
 **/

exports.updateTestRecord = async (params, data) => {
  try {
    const id = params.id;
    const trainee_id = params.trainee_id;

    const testData = await Test.findOne({
      where: {
        [Op.and]: [{ trainee_id: trainee_id }, { id: id }],
      },
    });
    if (!testData) {
      return {
        status: 400,
        data: {
          msg: "Record not found",
        },
      };
    }

    const updateTest = await testData.update({
      test_name: data.test_name,
      date: data.date,
      total_marks: data.total_marks,
      obtained_marks: data.obtained_marks,
      duration: data.duration,
    });
    if (updateTest) {
      return {
        status: 200,
        data: {
          msg: "Record updated successfully",
        },
      };
    }
    return {
      status: 400,
      data: {
        msg: "Something went wrong",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      data: {
        msg: "Something went worng!",
      },
    };
  }
};

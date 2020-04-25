const Trainee = require("../Models/trainee");
const Leave = require("../Models/leave");
const Mentor = require("../Models/mentor");
const { Op } = require("sequelize");
const transporter = require("../utils/mailConfigration");
const config = require("../utils/mailConf");
const moment = require("moment");

/**
 * @method : postLeave
 * @author : Mehak Dhiman
 * @description : To add leave record
 * @return :
 * @param :
 */

exports.postLeave = async (data) => {
  const traineeData = await Trainee.findOne({
    where: { id: 1 },
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
/**
 * @method : getLeaveRecords
 * @author : Mehak Dhiman
 * @description : To Retrive all data
 * @return :
 * @param :[params-trainee_id]
 *
 **/

exports.getLeaveRecords = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new Error("Parameter not found");
  }
  const traineegData = await Trainee.findOne({
    where: { id: id },
  });
  if (!traineegData) {
    throw new Error("Record not found");
  }
  const leaveRecords = await Leave.findAll({ where: { trainee_id: id } });

  if (leaveRecords) {
    res.render("leaveList", { leaveRecords, moment: moment });
  } else {
    throw new Error("Something went wrong");
  }
};

/**
 * @method : deleteLeave
 * @author : Mehak Dhiman
 * @description : To Delete Record
 * @return :
 * @param :[params- id,trainee_id]
 **/

exports.deleteLeave = async (req, res, next) => {
  const id = req.params.id;
  const trainee_id = req.params.trainee_id;

  const leaveData = await Leave.findOne({
    where: { [Op.and]: [{ trainee_id: trainee_id }, { id: id }] },
  });
  if (!leaveData) {
    res.status(400).json({
      msg: "Record not Exist",
    });
  }
  const deleteLeaveRecord = await Leave.destroy({
    where: { [Op.and]: [{ trainee_id: trainee_id }, { id: id }] },
  });
  if (deleteLeaveRecord) {
    res.status(200).json({
      msg: "Record deleted successfully",
    });
  }
  throw new Error("Something went wrong");
};

/**
 * @method : updateLeaveRecord
 * @author : Mehak Dhiman
 * @description : To Update Record BY id and trainee_id
 * @return :
 * @param :[params- id,trainee_id]
 **/

exports.updateLeaveRecord = async (params, data) => {
  const id = params.id;
  const trainee_id = params.trainee_id;

  const leaveData = await Leave.findOne({
    where: {
      [Op.and]: [{ trainee_id: trainee_id }, { id: id }],
    },
  });
  if (!leaveData) {
    return {
      status: 400,
      data: {
        msg: "Record not found",
      },
    };
  }

  const updatedLeave = await leaveData.update({
    start_date: data.start_date,
    end_date: data.end_date,
    subject: data.subject,
    reason: data.reason,
  });
  if (updatedLeave) {
    return {
      status: 200,
      data: {
        msg: "Record updated successfully",
      },
    };
  }
  throw new Error("Something went wrong");
};

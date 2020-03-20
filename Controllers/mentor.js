// const Mentor=require('../Models/mentor');
// const Department=require('../Models/department');
// const Trainee=require('../Models/trainee');

// exports.getTrainee=async (req,res,next)=>{
//     const id=1;
//     const mentor=await Mentor.findOne({where:{id:id}});
//     const mentorId=mentor.dataValues.id;
//     console.log(mentor);
//     const traineeList=Trainee.findAll({where:{mentor_id:mentorId}});
//     const traineeInfo=traineeList.dataValues.mentor_id;
//     console.log(traineeInfo);
// }
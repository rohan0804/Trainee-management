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
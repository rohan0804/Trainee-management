const Trainee = require('../Models/trainee');
const Category = require('../Models/category');
const subCategory = require('../Models/sub_category');
const Timelog = require('../Models/timelog');

// exports.postCategory = async (req, res) => {
//     const { category, subCategory } = req.body;
//     const Category = await Category.create({
//         name: category
//     })
//     const SubCategory = await subCategory.create({
//         name: subCategory
//     });
// }
// exports.postTimelog = async (req, res, next) => {
//     const { start_time, end_time, date, task_memo } = req.body;
//     const categoryID = await Category.findOne({ where: { name: name } });
//     const Timelog = await Timelog.create({
//         start_time,
//          end_time,
//           date, 
//           task_memo,
//            categoryname=categoryID.dataValues.name, 
//            subCategory=categoryID.dataValues.subCategoryname
//     })
// }

/**
 * @method : gettraineeDoubts
 * @author : Taranjeet
 * @description : Trainee should be ask doubts to mentor.
 * @return :
 * @param : [params]
 */

exports.getChat = async (req, res, next) => {
    res.render("trainee-doubts");
  };


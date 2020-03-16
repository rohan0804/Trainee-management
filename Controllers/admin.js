const Role = require('../Models/role');
exports.postAddRole = async (req, res) => {
    const { name } = req.body;
    // const roleStatus = await Role.create({
    //     name
    // });
    // console.log(roleStatus);
}
exports.getAddDepartment = async (req, res, next) => {
    res.render('department');
};

exports.postAddDepartment = async (req, res, next) => {
    const { name, head, syllabus } = req.body;
        // const departmentDetails = await Department.create({
        //     name, department_head, syllabus
        // });
        // console.log(departmentDetails);
};



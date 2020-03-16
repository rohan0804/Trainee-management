const express = require('express');
const router = express.Router();
const {postAddRole,postAddDepartment,getAddDepartment} = require('../Controllers/admin');

router.post('/add/role',postAddRole);

router.post('/add/department',postAddDepartment);

router.get('/add/department',getAddDepartment);
module.exports = router;
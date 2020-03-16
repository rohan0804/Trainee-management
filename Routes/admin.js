const express = require('express');
const router = express.Router();
const {postAddRole,postAddDepartment,getAddDepartment} = require('../Controllers/admin');
const { postTraineeSignup, getTraineeSignup,getAddMentor,postAddMentor} = require('../Controllers/admin');
router.post('/add/role',postAddRole);
router.post('/add/department',postAddDepartment);
router.get('/add/department',getAddDepartment);
router.post('/add/trainee', postTraineeSignup);
router.get('/add/trainee', getTraineeSignup);
router.post('/add/mentor',postAddMentor);
router.get('/add/mentor',getAddMentor);

module.exports = router;
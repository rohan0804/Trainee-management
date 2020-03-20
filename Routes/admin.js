const express = require('express');
const router = express.Router();
const {postAddRole,postAddDepartment,getAddDepartment,getEditTrainee,gettrainee,postDeleteTrainee} = require('../Controllers/admin');
const { postTraineeSignup, getTraineeSignup,getAddMentor,gethrDepartment,postEditTrainee,postAddMentor,putAddMentor,deleteMentor} = require('../Controllers/admin');
router.post('/add/role',postAddRole);
router.post('/add/department',postAddDepartment);
router.get('/add/department',getAddDepartment);
router.post('/add/trainee', postTraineeSignup);
router.get('/add/trainee', getTraineeSignup);
router.get('/add/mentor',getAddMentor);
router.post('/add/mentor',postAddMentor);


router.get('/edit-trainee/:id',getEditTrainee);
router.post('/edit-trainee',postEditTrainee);


router.get('/trainee/:id',gettrainee);
router.post('/delete-trainee',postDeleteTrainee);

router.get('/hr/:id',gethrDepartment);

module.exports = router;
const express = require('express');
const router = express.Router();
const {postAddRole,postAddDepartment,getAddDepartment,gettrainee,postDeleteTrainee,posthrDepartment,gethrDepartment} = require('../Controllers/admin');
const { postTraineeSignup, getTraineeSignup,getAddMentor,postAddMentor,getEditTrainee,postEditTrainee} = require('../Controllers/admin');
router.post('/add/role',postAddRole);
router.post('/add/department',postAddDepartment);
router.get('/add/department',getAddDepartment);
router.post('/add/trainee', postTraineeSignup);
router.get('/add/trainee', getTraineeSignup);
router.post('/add/mentor',postAddMentor);
router.get('/add/mentor',getAddMentor);



router.get('/edit-trainee/:id',getEditTrainee);
router.post('/edit-trainee',postEditTrainee);


router.get('/trainee/:id',gettrainee);
router.post('/delete-trainee',postDeleteTrainee);

router.get('/hr',gethrDepartment);
router.post('/hr',posthrDepartment);
module.exports = router;
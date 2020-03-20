const express = require('express');
const router = express.Router();
const {postAddRole,postAddDepartment,getAddDepartment} = require('../Controllers/admin');
const { postTraineeSignup, getTraineeSignup,getAddMentor,postAddMentor,putAddMentor,deleteMentor} = require('../Controllers/admin');
router.post('/add/role',postAddRole);
router.post('/add/department',postAddDepartment);
router.get('/add/department',getAddDepartment);
router.post('/add/trainee', postTraineeSignup);
router.get('/add/trainee', getTraineeSignup);
router.get('/add/mentor',getAddMentor);
router.post('/add/mentor',postAddMentor);
router.put('/add/mentor/:id',putAddMentor);
router.delete('/add/mentor/:id',deleteMentor)



router.get('/edit-trainee/:id',getEditTrainee);
router.post('/edit-trainee',postEditTrainee);


router.get('/trainee/:id',gettrainee);
router.post('/delete-trainee',postDeleteTrainee);

router.get('/hr',gethrDepartment);
router.post('/hr',posthrDepartment);
module.exports = router;
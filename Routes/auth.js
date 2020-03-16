const express = require('express');
const router = express.Router();
const { getLogin, postTraineeSignup, getTraineeSignup,getAddMentor,postAddMentor} = require('../Controllers/auth');
router.get('/login', getLogin);
router.post('/add/trainee', postTraineeSignup);
router.get('/add/trainee', getTraineeSignup);
router.post('add/mentor',postAddMentor);
router.get('add/mentor',getAddMentor);
module.exports = router;
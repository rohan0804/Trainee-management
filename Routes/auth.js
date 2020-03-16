const express = require('express');
const router = express.Router();
const { getLogin, postTraineeSignup, getTraineeSignup } = require('../Controllers/auth');
router.get('/login', getLogin);
router.post('/add/trainee', postTraineeSignup);
router.get('/add/trainee', getTraineeSignup)
module.exports = router;
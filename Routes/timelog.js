const express=require('express');
const router=express.Router();
const {postTimelog}=require('../Controllers/timelog');

// router.get('/timelog',);

router.post('/timelog',postTimelog);

module.exports=router;
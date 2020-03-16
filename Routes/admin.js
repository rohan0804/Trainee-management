const express = require('express');
const router = express.Router();
const {postAddRole} = require('../Controllers/admin');

router.post('/add/role',postAddRole);

module.exports = router;
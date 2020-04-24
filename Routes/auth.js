const express = require('express');
const router = express.Router();
const {getLogin,postLogin} = require('../Controllers/auth');

router.get('/', getLogin);
router.post('/',postLogin);
module.exports = router;
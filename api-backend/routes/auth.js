const express = require('express');
const router = express.Router();

const {doRegister, doLogin} = require('../controllers/tasks');
router.route('/register').post(doRegister);
router.route('/login').post(doLogin);

module.exports = router;

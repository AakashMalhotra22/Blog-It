const express = require('express');
const router = express.Router();

const {doRegister} = require('../controllers/tasks');

router.route('/register').post(doRegister);

module.exports = router;

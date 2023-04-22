const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const {doRegister, doLogin} = require('../controllers/tasks');

router.route('/register').post([body('username').isLength({min:3}), body('password').isLength({min:8})],doRegister);
router.route('/login').post(doLogin);

module.exports = router;

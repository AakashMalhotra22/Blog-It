const express = require('express');
const router = express.Router();
const {doRegister, doLogin} = require('../controllers/auth-controllers');
const { registerValidator, registerValidationMiddleware } = require('../middleware/registerUserValidator');


router.route('/register').post(registerValidator,registerValidationMiddleware, doRegister);
router.route('/login').post(doLogin);

module.exports = router;

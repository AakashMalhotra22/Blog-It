const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const {doRegister, doLogin} = require('../controllers/tasks');

// Register validation
const validator = 
[
    check('username').isLength({min:3}).withMessage('Username should be of minimum 3 character'),
    check('password').isLength({min:8}).withMessage('Password should be of minimum 8 character')
]

const result = (req,res,next)=>
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        const err = errors.array()[0].msg;
        return res.status(403).json({"msg": err});
    }
    next();
}
router.route('/register').post(validator, result, doRegister);
router.route('/login').post(doLogin);

module.exports = router;

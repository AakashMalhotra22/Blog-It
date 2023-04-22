const { check, validationResult } = require('express-validator');

// Register validation
const registerValidator = 
[
    check('username').isLength({min:3}).withMessage('Username should be of minimum 3 character'),
    check('password').isLength({min:8}).withMessage('Password should be of minimum 8 character')
]
// Register validation result middleware
const registerValidationMiddleware = (req,res,next)=>
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        const err = errors.array()[0].msg;
        return res.status(403).json({"msg": err});
    }
    next();
}

module.exports ={registerValidator,registerValidationMiddleware};
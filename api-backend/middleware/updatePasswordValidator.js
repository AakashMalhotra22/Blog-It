const { check, validationResult } = require('express-validator');

// Register validation
const updatePassValidator = 
[
    check('password').isLength({min:8}).withMessage('Password should be of minimum 8 character'),
]
// Register validation result middleware
const updatePassValidationMiddleware = (req,res,next)=>
{
    console.log("Success");
    console.log("fire");
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        const err = errors.array()[0].msg;
        return res.status(403).json({"msg": err});
    }
    next();
}

module.exports ={updatePassValidator,updatePassValidationMiddleware};
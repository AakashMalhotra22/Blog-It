const express = require('express');
const router = express.Router();
const multer = require('multer');

const {doRegister, doLogin, doProfile, doUpdate, doUpdatePass, doSavePost, doAllSavePost} = require('../controllers/auth-controllers');
const { registerValidator, registerValidationMiddleware } = require('../middleware/registerUserValidator');
const { validateProfilePhoto } = require('../middleware/validateProfilePhoto');
const authenticateUser = require('../middleware/userAuthenticationMiddleware');
const { validateUpdateProfilePhoto } = require('../middleware/ValidateUpdateProfilePhoto');
const { updateValidator, updateValidationMiddleware } = require('../middleware/updateUserValidator');
const { updatePassValidationMiddleware, updatePassValidator } = require('../middleware/updatePasswordValidator');
// const sendmail = require('../controllers/send-controllers');
const uploadMiddleware = multer({dest: 'uploads/'}); 

const fn =(req,res,next)=>
{
    console.log(req.body);
    console.log("enter");
    console.log(req.body);
    next();
}

const fn2 =(req,res,next)=>
{
    console.log(req.body);
    console.log("hello aakash1");
    next();
}

router.route('/register').post(uploadMiddleware.single('file'),validateProfilePhoto,registerValidator, registerValidationMiddleware,fn,doRegister);
router.route('/login').post(doLogin);
router.route('/:id').get(authenticateUser,doProfile);
router.route('/update/:id').post(uploadMiddleware.single('file'),validateUpdateProfilePhoto,
updateValidator, updateValidationMiddleware, doUpdate);
router.route('/updatepassword/:id').post(fn2,updatePassValidator, updatePassValidationMiddleware, doUpdatePass);


router.route('/savedPost').put(doSavePost);
router.route('/allsavedPost/:id').get(doAllSavePost);


module.exports = router;
 
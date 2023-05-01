const express = require('express');
const router = express.Router();
const multer = require('multer');

const {doRegister, doLogin, doProfile, doUpdate, doUpdatePass} = require('../controllers/auth-controllers');
const { registerValidator, registerValidationMiddleware } = require('../middleware/registerUserValidator');
const { validateProfilePhoto } = require('../middleware/validateProfilePhoto');
const verifyToken = require('../middleware/verifyToken');
const { validateUpdateProfilePhoto } = require('../middleware/ValidateUpdateProfilePhoto');
const { updateValidator, updateValidationMiddleware } = require('../middleware/updateUserValidator');
const { updatePassValidationMiddleware, updatePassValidator } = require('../middleware/updatePasswordValidator');
const uploadMiddleware = multer({dest: 'uploads/'}); 

// register a user
router.route('/register').post(uploadMiddleware.single('file'),validateProfilePhoto,registerValidator, registerValidationMiddleware,doRegister);

// login user
router.route('/login').post(doLogin);

// access profile of a user
router.route('/:id').get(verifyToken,doProfile);

//update profile of a user
router.route('/update/:id').post(uploadMiddleware.single('file'),validateUpdateProfilePhoto,
updateValidator, updateValidationMiddleware, doUpdate);

// update password of a user
router.route('/updatepassword/:id').post(updatePassValidator, updatePassValidationMiddleware, doUpdatePass);


module.exports = router;
 
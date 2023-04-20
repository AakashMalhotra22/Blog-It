const express = require('express');
const router = express.Router();

const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'}); 

const {doCreatePost} = require('../controllers/blog');

router.route('/post').post(uploadMiddleware.single('file'),doCreatePost);

module.exports = router;
 
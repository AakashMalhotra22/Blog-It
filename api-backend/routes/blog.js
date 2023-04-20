const express = require('express');
const router = express.Router();

const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'}); 

const {doCreatePost, doAccessPost} = require('../controllers/blog');

router.route('/post').post(uploadMiddleware.single('file'),doCreatePost);
router.route('/allposts').get(doAccessPost);

module.exports = router;
 
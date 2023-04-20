const express = require('express');
const router = express.Router();

const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'}); 

const {doCreatePost, doAccessAllPosts,doSinglePost} = require('../controllers/blog');

router.route('/post').post(uploadMiddleware.single('file'),doCreatePost);
router.route('/allposts').get(doAccessAllPosts);
router.route('/post/:id').get(doSinglePost);
module.exports = router;
 
const express = require('express');
const router = express.Router();

const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'}); 

const {doCreatePost, doAccessAllPosts,doSinglePost,doDeletePost} = require('../controllers/blog');

router.route('/post').post(uploadMiddleware.single('file'),doCreatePost);
router.route('/allposts').get(doAccessAllPosts);
router.route('/post/:id').get(doSinglePost).delete(doDeletePost);

module.exports = router;
 
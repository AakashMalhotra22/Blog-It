const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'}); 
const { validateCreatePost }  = require('../middleware/createPostValidator');
const {validateEditPost} = require('../middleware/editPostValidator');

const {doCreatePost, 
       doAccessAllPosts,
       doSinglePost,
       doDeletePost,
       doUpdatePost} = require('../controllers/blog-controllers');

// uploading a post
router.route('/post').post(uploadMiddleware.single('file'),validateCreatePost, doCreatePost);
// accessing all post
router.route('/allposts').get(doAccessAllPosts);
// accessing and deleting single post
router.route('/post/:id').get(doSinglePost).delete(doDeletePost);
// updating a post
router.route('/updatepost').put(uploadMiddleware.single('file'),validateEditPost, doUpdatePost);

module.exports = router;
 
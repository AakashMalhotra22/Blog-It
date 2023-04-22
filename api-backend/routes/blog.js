const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'}); 
const { validateCreatePost }  = require('../middleware/createPostValidator');
const {validateEditPost} = require('../middleware/editPostValidator');
const authenticateUser = require('../middleware/userAuthenticationMiddleware');

const {doCreatePost, 
       doAccessAllPosts,
       doSinglePost,
       doDeletePost,
       doUpdatePost} = require('../controllers/blog-controllers');

// uploading a post 
router.route('/post').post(authenticateUser ,uploadMiddleware.single('file'),validateCreatePost, doCreatePost);

// accessing all post
router.route('/allposts').get(authenticateUser,doAccessAllPosts);

// accessing and deleting single post
router.route('/post/:id').get(authenticateUser, doSinglePost).delete(authenticateUser, doDeletePost);

// updating a post
router.route('/updatepost').put(authenticateUser, uploadMiddleware.single('file'),validateEditPost, doUpdatePost);

module.exports = router;
 
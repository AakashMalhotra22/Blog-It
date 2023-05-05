const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'}); 
const { validateCreatePost }  = require('../middleware/createPostValidator');
const {validateEditPost} = require('../middleware/editPostValidator');
const verifyToken = require('../middleware/verifyToken');

const {doCreatePost, 
       doAccessAllPosts,
       doSinglePost,
       doDeletePost,
       doUpdatePost,
       doAllPostUser,
       doPopularPost,
       doLikePost,
       doSavePost,
       doAllSavedPost} = require('../controllers/blog-controllers');

// add post
router.route('/post').post(verifyToken ,uploadMiddleware.single('file')
,validateCreatePost, doCreatePost);

// access all post
router.route('/allposts').get(verifyToken,doAccessAllPosts);

// access single post with given id and delete post with given id
router.route('/post/:id').get(verifyToken, doSinglePost).delete(verifyToken, doDeletePost);

// access allpost of a user with given user id
router.route('/allposts/:id').get(doAllPostUser);

// popular post
router.route('/popularpost').get(doPopularPost);

// update a post 
router.route('/updatepost').put(verifyToken, uploadMiddleware.single('file'),validateEditPost, doUpdatePost);

// like a post
router.route('/likepost').put(doLikePost);

// save a Post
router.route('/savePost').put(doSavePost);

// access saved post of a user 
router.route('/savedposts').get(doAllSavedPost);

module.exports = router;
 
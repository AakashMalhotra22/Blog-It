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
       doUpdatePost,
       doAllPostUser,
       doPopularPost,
       doLikePost} = require('../controllers/blog-controllers');

// add post
router.route('/post').post(authenticateUser ,uploadMiddleware.single('file')
,validateCreatePost, doCreatePost);
// access all post
router.route('/allposts').get(authenticateUser,doAccessAllPosts);
// access single post with given id and delete post with id
router.route('/post/:id').get(authenticateUser, doSinglePost).delete(authenticateUser, doDeletePost);

// access allpost of a user with given user id
router.route('/allposts/:id').get(doAllPostUser);

// popular post
router.route('/popularpost').get(doPopularPost);
// update a post 
router.route('/updatepost').put(authenticateUser, uploadMiddleware.single('file'),validateEditPost, doUpdatePost);

// like a post
router.route('/likepost').put(doLikePost);


module.exports = router;
 
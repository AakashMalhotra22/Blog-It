const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'}); 

const {doCreatePost, doAccessAllPosts,doSinglePost,doDeletePost,doUpdatePost} = require('../controllers/blog');

const validateFile = (req,res,next)=>{
    const expectedFileType = ['png', 'jpg', 'jpeg'];
    if(!req.file)
    {
        return res.status(404).json({"msg": "Upload an Image"});
    }
    const {originalname} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];

    if(!expectedFileType.includes(ext))
    {
        return res.status(403).json({"msg": "You can only upload Image"});
    }
    next();
}

router.route('/post').post(uploadMiddleware.single('file'),validateFile, doCreatePost);
router.route('/allposts').get(doAccessAllPosts);
router.route('/post/:id').get(doSinglePost).delete(doDeletePost);
router.route('/updatepost').put(uploadMiddleware.single('file'), doUpdatePost);

module.exports = router;
 
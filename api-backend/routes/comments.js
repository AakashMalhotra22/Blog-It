const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const { doGetComments,
        doAddComment, 
        doDeleteComment, 
        doEditComment } = require('../controllers/comment-controllers');

router.route('/getAll/:id').get(doGetComments);
router.route('/addComment/:id').post(verifyToken, doAddComment);
router.route('/:id').put(verifyToken, doEditComment).delete(verifyToken ,doDeleteComment);

module.exports = router;
 
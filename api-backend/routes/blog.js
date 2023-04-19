const express = require('express');
const router = express.Router();

const {doCreatePost} = require('../controllers/blog');
router.route('/post').post(doCreatePost);

module.exports = router;

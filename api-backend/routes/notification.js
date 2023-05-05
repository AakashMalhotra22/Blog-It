const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { doGetNotifications} = require('../controllers/notification-controllers');

//accessing all notification for a user
router.route('/getAll').get(verifyToken ,doGetNotifications);
module.exports = router;
 
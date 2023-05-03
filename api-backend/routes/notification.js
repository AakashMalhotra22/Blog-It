const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { doGetNotifications } = require('../controllers/notification-controllers');

router.route('/getAll').get(doGetNotifications);
module.exports = router;
 
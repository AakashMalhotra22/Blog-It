const Notification = require('../models/Notification');
const User = require('../models/User');

// accessing all notifications
const doGetNotifications = async(req,res)=>
{
    // Get userId
    const userId = req.query.userId;
    const page = req.query.page || 1;

    // finding the last time where user accessed notification
    // if last time is within 24 hour then update last time to currenttime - 24 hour.
    let user = await User.findById(userId);
    let lastdate = user.notificationTime;

    let lasttime = new Date(lastdate).getTime();
    const currentTime = Date.now();
    
    // Calculate the difference between the current time and the last time
    const timeDifference = currentTime - lasttime;

    // Check if the time is within the last 24 hours (86400000 milliseconds = 24 hours)
    if (timeDifference <= 86400000) 
    {
        lastdate= new Date(currentTime-86400000);
    }
    
    const perPage =8;

    const allnotifications = await Notification.find({
         createdAt: { $gt: lastdate }, authorId: userId,
    })
    .populate('userId', ['name', '_id'])
    .sort({createdAt:-1})
    .skip((perPage * page) - perPage)
    .limit(perPage);
    
    // updating last notification access time of user
    await User.updateMany({ _id: userId },
    {              
        $set: {notificationTime: Date.now()}
    })
    res.json(allnotifications);
}
module.exports = {doGetNotifications};
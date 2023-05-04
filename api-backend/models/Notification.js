const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const  NotificationSchema = new Schema(
{
    notification_type: { type: String, enum: ['like', 'comment'], required: true },
    message:  { type: String, required:true},
    userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    authorId: { type:Schema.Types.ObjectId, ref:'User'},
},{
    timestamps: true,
});

const NotificationModel = model('Notification',NotificationSchema);
module.exports = NotificationModel;
const Comment = require('../models/Comments');
const Notification = require('../models/Notification');

const doGetComments = async (req,res)=>{
    const {id} = req.params;
    let comments = await Comment.find({postId: id});

    res.json(comments);
}

const doAddComment = async (req,res)=>{
    const {id} = req.params;
    const {comment, username, userId, authorId} = req.body;

    // new comment
    const newcomment = await Comment.create({
        content: comment,
        username,
        userId,
        postId: id
    })
    
    // sending notification
    const notification = await Notification.create({
        notification_type: 'comment',
        message: comment,
        userId,
        postId: id,
        authorId,
    })
    console.log(notification);

    res.json({notification,newcomment} );
}

const doEditComment = async (req,res)=>
{
    const {id} = req.params;
    const {message} = req.body 

    console.log(id);
    console.log(message);

    const filter = {_id : id};
    const upd = 
    {
        content: message,
    }
    const updatedComment = await Comment.findOneAndUpdate(filter,upd, {new:true})
    res.json(updatedComment);
}
const doDeleteComment = async (req,res)=>{
    const {id} = req.params;
    let deletedcomment = await Comment.findByIdAndDelete(id);
    res.json(deletedcomment);
}
module.exports = {doGetComments, doAddComment, doEditComment, doDeleteComment};
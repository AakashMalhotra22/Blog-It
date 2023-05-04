const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const  CommentSchema = new Schema(
{
    content: { type: String, required: true },
    username: { type: String, required: true },
    userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
},{
    timestamps: true,
});

const CommentModel = model('Comment',CommentSchema);
module.exports = CommentModel;


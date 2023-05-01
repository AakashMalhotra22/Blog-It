const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const PostSchema = new Schema({
  title:String,
  summary:String,
  content:String,
  cover:String,
  authorId:{type:Schema.Types.ObjectId, ref:'User'},
  interactions: {type: Array, default: []},
  likeduser: {type: [String], default: []},
  likes: {type: Number, default: 0},
}, {
  timestamps: true,
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;
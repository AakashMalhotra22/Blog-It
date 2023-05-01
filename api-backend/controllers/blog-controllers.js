const Post = require('../models/Post');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs'); 

// CreateBlog function
const doCreatePost = async (req,res)=>
{ 
    // storing file with the extension in uploads
    // console.log(req.file);
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];

    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
    // console.log("new"+newPath);

    let data = req.data;
    const email = data.email;
    const userId = data.id;

    // Storing a post in database 
    const {title, summary,content} = req.body;
    const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        authorId: userId,
    })
    res.json(postDoc);
}

// Accessing all the Blogs function
const doAccessAllPosts = async(req,res)=>
{
    // asccessing all post according to recent time with a limit of 20
    const allposts = await Post.find()
    .populate('authorId')
    .sort({createdAt:-1})
    .limit(20);
    res.json(allposts);
}

// Accessing single Blog function
const doSinglePost = async(req,res)=>
{   
    const {id} = req.params;
    let singlePost = await Post.findById(id).populate('authorId');
    res.json(singlePost);
}

// Deleting Blog function
const doDeletePost = async(req,res)=>
{
    const {id} = req.params;
    let singlePost = await Post.findByIdAndDelete(id);
    res.json(singlePost);
}

const doAllPostUser = async(req,res)=>
{   
    const {id} = req.params;
    let Posts = await Post.find({authorId: id})
    .populate('authorId')
    .sort({createdAt:-1})
    .limit(20);

    console.log(Posts);
    res.json(Posts);
}

// Updating Blog function
const doUpdatePost = async(req,res)=>
{
    let newPath = null;
    if (req.file) 
    {
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
    }
    const {title, summary,content, id } = req.body;
    
    // Updating the Post
    const filter = {_id : id};
    const upd = 
    {
        title,
        summary,
        content,
    }
    if(newPath)
    {
        upd.cover = newPath
    }
    const postData = await Post.findOneAndUpdate(filter,upd, {new:true})
    res.json(postData);
}
// popular post
const doPopularPost = async(req,res)=>
{
    const allposts = await Post.find()
    .populate('authorId')
    .sort({likes:"desc", interactions: "desc",createdAt:-1})
    .limit(20);
    console.log(allposts);
    res.json(allposts);
}

// like a post
const doLikePost  = async(req,res)=>
{
    const {postId, userId} = req.body;
    let post1 = await Post.findById(postId);
    let likeduser = post1.likeduser;
    let likes = post1.likes;

    let result;
    if(likeduser.includes(userId))
    {
        result = await Post.updateMany({ _id: postId },
        {
            $pull: { likeduser: { $in: [userId] } },                
            $set: {likes: likes-1 }
        })        
    }
    else
    {   
        result = await Post.updateMany(
        { _id: postId },
        {
            $push: { likeduser: userId  },                
            $set: {likes: likes+1 }
        })
    }
     let post = await Post.findById(postId);
    res.json({result, likeduser,likes,post});
}
// save a Post
const doSavePost  = async(req,res)=>
{
    const {postId, userId} = req.body;
    let post1 = await Post.findById(postId);
    let savedPost = post1.savedPost;

    let result;
    if(savedPost.includes(userId))
    {
        result = await Post.updateMany({ _id: postId },
        {
            $pull: { savedPost: { $in: [userId] } },
        })        
    }
    else
    {   
        result = await Post.updateMany(
        { _id: postId },
        {
            $push: { savedPost: userId  },
        })
    }
    let post = await Post.findById(postId);
    res.json({result, savedPost,post});
}

module.exports = {doCreatePost, doAccessAllPosts,doSinglePost, doDeletePost, doUpdatePost, doAllPostUser,doPopularPost, doLikePost,doSavePost};
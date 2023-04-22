const Post = require('../models/Post');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs'); 

// CreateBlog function
const doCreatePost = async (req,res)=>
{ 
    // storing file with the extension in uploads
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];

    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    let data = req.data;
    const username = data.username;
    const userId = data.id;

    // Storing a post in database 
    const {title, summary,content} = req.body;
    const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: username,
        authorId: userId
    })
    res.json(postDoc);
}

// Accessing all the Blogs function
const doAccessAllPosts = async(req,res)=>
{
    // asccessing all post according to recent time with a limit of 20
    const allposts = await Post.find()
    .sort({createdAt:-1})
    .limit(20);
    res.json(allposts);
}

// Accessing single Blog function
const doSinglePost = async(req,res)=>
{   
    const {id} = req.params;
    let singlePost = await Post.findById(id);
    res.json(singlePost);
}

// Deleting Blog function
const doDeletePost = async(req,res)=>
{
    const {id} = req.params;
    let singlePost = await Post.findByIdAndDelete(id);
    res.json(singlePost);
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

module.exports = {doCreatePost, doAccessAllPosts,doSinglePost, doDeletePost, doUpdatePost};
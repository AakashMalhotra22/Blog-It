const bcrypt  = require('bcryptjs');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const Post = require('../models/Post');
 
const doCreatePost = async (req,res)=>
{
    // storing file with the extension in uploads
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    // checking token or verifying user
    const token = req.header('token');
    if(!token)
    {
        res.status(401).send("unauthorized token");  
    }

    const data = jwt.verify(token,process.env.JWT_SECRET);
    const username = data.username;

    // Storing a post in database 
    const {title, summary,content} = req.body;
    const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: username

    })
    res.json(postDoc);
}

const doAccessAllPosts = async(req,res)=>
{
    // asccessing all post according to recent time with a limit of 20
    const allposts = await Post.find()
    .sort({createdAt:-1})
    .limit(20);
    res.json(allposts);
}

const doSinglePost = async(req,res)=>
{   
    const {id} = req.params;
    let singlePost = await Post.findById(id);
    res.json(singlePost);
}

module.exports = {doCreatePost, doAccessAllPosts,doSinglePost};
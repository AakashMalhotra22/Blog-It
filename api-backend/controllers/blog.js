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
        return res.status(401).send("unauthorized token");  
    }

    const data = jwt.verify(token,process.env.JWT_SECRET);
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

const doAccessAllPosts = async(req,res)=>
{
    // // checking token or verifying user
    const token = req.header('token');
    if(!token)
    {
        return res.status(401).send("unauthorized token");  
    }
    const data = jwt.verify(token,process.env.JWT_SECRET);

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
const doDeletePost = async(req,res)=>
{
    const {id} = req.params;
    let singlePost = await Post.findByIdAndDelete(id);
    res.json(singlePost);
}

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

    // checking token or verifying user
    const token = req.header('token');
    if(!token)
    {
        return res.status(401).send("unauthorized token");  
    }
    const data = jwt.verify(token,process.env.JWT_SECRET);

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
    const postD = await Post.findOneAndUpdate(filter,upd, {new:true})
    res.json(postD);
}

module.exports = {doCreatePost, doAccessAllPosts,doSinglePost, doDeletePost, doUpdatePost};
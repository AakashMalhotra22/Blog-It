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


    // Storing a post in database 
    const {title, summary,content} = req.body;
    const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,

    })
    res.json(postDoc);
}

const doAccessPost = async(req,res)=>
{
    const allposts = await Post.find();
    res.json(allposts);
}

module.exports = {doCreatePost, doAccessPost};
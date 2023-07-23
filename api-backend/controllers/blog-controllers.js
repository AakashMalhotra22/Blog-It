const Post = require('../models/Post');
const User = require('../models/User');
const Notification = require('../models/Notification');
const fs = require('fs'); 


// create a Blog
const doCreatePost = async (req,res)=>
{ 
    // storing file with the extension in uploads
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

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

// Accessing all the Blogs
const doAccessAllPosts = async(req,res)=>
{
    const perPage =3;
    const page = req.query.page || 1;
    const lastItemTimestamp = req.query.lastItemTimestamp || Date.now();

    const allposts = await Post.find({
        createdAt: { $lt: lastItemTimestamp },
      })
    .populate('authorId')
    .sort({createdAt:-1})
    .skip((perPage * page) - perPage)
    .limit(perPage);

    res.json(allposts);
}

// accessing a single Blog 
const doSinglePost = async(req,res)=>
{   
    const {id} = req.params; 
    let singlePost = await Post.findById(id).populate('authorId');
    res.json(singlePost);
}

// delete a blog
const doDeletePost = async(req,res)=>
{
    const {id} = req.params;
    let post = await Post.findByIdAndDelete(id);
    let creator = post.authorId;

    let user = await User.findById(creator);

    // updating total likes of a user on post deletion
    await User.updateMany({ _id: creator },
    {              
         $set: {likes: user.likes-post.likes}
    })
    res.json(post);
}

// accessing all blogs of a user
const doAllPostUser = async(req,res)=>
{   
    const {id} = req.params;
    const perPage =3;
    const page = req.query.page || 1;
    const lastItemTimestamp = req.query.lastItemTimestamp || Date.now();

    const Posts = await Post.find({authorId: id,
        createdAt: { $lt: lastItemTimestamp },
      })
    .populate('authorId')
    .sort({likes:"desc",createdAt:-1})
    .skip((perPage * page) - perPage)
    .limit(perPage);
    res.json(Posts);
}

// updating a blog
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
    const perPage =3;
    const page = req.query.page || 1;
    const lastItemTimestamp = req.query.lastItemTimestamp || Date.now();

    const allposts = await Post.find({
        createdAt: { $lt: lastItemTimestamp },
      })
    .populate('authorId')
    .sort({likes:"desc",createdAt:-1})
    .skip((perPage * page) - perPage)
    .limit(perPage);

    res.json(allposts);
}

// like a post
const doLikePost  = async(req,res)=>
{
    const {postId, userId} = req.body;
    let post1 = await Post.findById(postId).populate('authorId');
    let creator = post1.authorId._id;
    let creator_likes = post1.authorId.likes;
    
    // post details
    let likeduser = post1.likeduser;
    let likes = post1.likes;

    let result;
    // if post has been liked by user then dislike
    if(likeduser.includes(userId))
    {
        result = await Post.updateMany({ _id: postId },
        {
            $pull: { likeduser: { $in: [userId] } },                
            $set: {likes: likes-1}
        })
        await User.updateMany({ _id: creator },
        {              
            $set: {likes: creator_likes-1}
        })
    }
    // if post has not been liked by user then like it
    else
    {   
        result = await Post.updateMany(
        { _id: postId },
        {
            $push: { likeduser: userId  },                
            $set: {likes: likes+1 }
        })
        await User.updateMany({ _id: creator },
        {              
            $set: {likes: creator_likes+1}
        })
        // checking if notification is already send
        const allnotifications = await Notification.find({
            userId, postId, notification_type: "like",
        })

        if (allnotifications.length==0)
        {   
            //sending notification
            const newNotification = await Notification.create({
                notification_type: "like",
                message: "",
                userId,
                postId,
                authorId: post1.authorId._id
            })        
        }   
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

// accessing all saved post of a user
const doAllSavedPost = async(req,res)=>
{   
    const Posts = await Post.find()
    .populate('authorId')
    .sort({createdAt:-1})
    
    res.json(Posts);
}

module.exports = {doCreatePost, doAccessAllPosts,doSinglePost, doDeletePost, doUpdatePost,
     doAllPostUser,doPopularPost, doLikePost,doSavePost, doAllSavedPost};
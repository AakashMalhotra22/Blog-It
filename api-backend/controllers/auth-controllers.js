const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs'); 

const doRegister = async (req,res)=>
{
    // checking for file extension
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
 
    const {name,password, email} = req.body;
 
    // checking user already exist
    let user = await User.findOne({email:req.body.email});
    if(user)
    {
        return res.status(400).json({'msg':"username already exist"});
    }

     // encrypting the password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password,salt);

    // creating user
    user = await User.create(
    {
          name,
          password: secPass,
          email,
          photo: newPath,
    })
    
    res.json({"msg":"Registration Successful", "details":req.body});
}

const doLogin = async (req,res)=>
{
    const {email,password} = req.body;
    
    // checking user existence
    let user = await User.findOne({email:req.body.email});
    if(!user)
    {
        return res.status(400).json({'msg':"user with this email doesnot exist"});
    }

    // decrypting the password
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare)
    {
        return res.status(400).json({'msg':"Wrong password"});
    }

    //creating token
    const authtoken = jwt.sign({email,id:user._id},process.env.JWT_SECRET);

    res.json({"message":"Login Successful", "details":req.body,"token": authtoken, "id": user._id, "user":user});
}

// accessing profile for a user
const doProfile = async (req,res)=>
{
    const {id} = req.params;

    let singleUser = await User.findById(id);
    console.log(singleUser);
    res.json(singleUser);
}

// update user profile
const doUpdate = async (req,res)=>
{
    const {id} = req.params;

    let newPath1;
    if (req.file) 
    {
        const {originalname,path} = req.file;        
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath1 = path+'.'+ext;
        fs.renameSync(path, newPath1);
    }
    
    const filter = {_id : id};
    const {name} = req.body;

    const upd = 
    {
        name
    }
    if(newPath1)
    {
        upd.photo = newPath1
    }
    const userdata = await User.findOneAndUpdate(filter,upd, {new:true})
    res.json({"msg":"Profile Updated", userdata});
}

// update password
const doUpdatePass = async (req,res)=>
{
    const {id} = req.params;
    const {oldpassword, password} = req.body;
    
    // checking user existence
    let user = await User.findById(id);

    // decrypting the password
    const passwordCompare = await bcrypt.compare(oldpassword,user.password);
    if(!passwordCompare)
    {
        return res.status(400).json({'msg':"Old password is wrong"});
    }

     // encrypting the new password
     const salt = await bcrypt.genSalt(10);
     const secPass = await bcrypt.hash(password,salt);

    const filter = {_id : id};
    const upd = 
    {
        password: secPass
    }
    const userdata = await User.findOneAndUpdate(filter,upd, {new:true})
    res.json({"msg":"Password Updated",userdata});
}
module.exports = {doRegister,doLogin, doProfile, doUpdate,doUpdatePass};
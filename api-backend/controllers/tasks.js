const bcrypt  = require('bcryptjs');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const doRegister = async (req,res)=>
{
    // validation on Registeration
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
    {
        console.log(errors);
        return res.status(403).json(errors);
    }

    const {username,password} = req.body;
    
    // checking user already exist
    let user = await User.findOne({username:req.body.username});
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
          username: username,
          password: secPass,
    })

    res.json({"message":"Registration Successful", "details":req.body, "Encrypted password": secPass});
}

const doLogin = async (req,res)=>
{
    const {username,password} = req.body;
    
    // checking user already exist
    let user = await User.findOne({username:req.body.username});
    if(!user)
    {
        return res.status(400).json({'msg':"username doesnot exist"});
    }

    // decrypting the password
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare)
    {
        return res.status(400).json({'msg':"Wrong password"});
    }

    //creating token
    const authtoken = jwt.sign({username,id:user._id},process.env.JWT_SECRET);

    res.json({"message":"Login Successful", "details":req.body,"token": authtoken, "id": user._id});
}
module.exports = {doRegister,doLogin};
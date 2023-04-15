const bcrypt  = require('bcryptjs');
const User = require('../models/users');

const doRegister = async (req,res)=>
{
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
module.exports = {doRegister};
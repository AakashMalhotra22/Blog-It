const jwt = require('jsonwebtoken');

// User Authentication 
const authenticateUser = (req,res,next)=>
{
    const token = req.header('token');
    if(!token)
    {
        return res.status(401).json({"msg": "unauthorized token"});  
    }
    try
    {
        const info = jwt.verify(token,process.env.JWT_SECRET);
        req.data = info
    }
    catch(err)
    {
        return res.status(401).json({"msg": "unauthorized token"});
    }
    next();
}

module.exports = authenticateUser

const validateUpdateProfilePhoto = (req,res,next)=>{
    
    console.log("check1");
    const expectedFileType = ['png', 'jpg', 'jpeg', 'webp'];
    if(!req.file)
    {
        next();
    }
    else
    {
        const {originalname} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
    
        if(!expectedFileType.includes(ext))
        {
            return res.status(403).json({"msg": "You can only upload Image"});
        }
        
        next();
    }
   
}
module.exports = {validateUpdateProfilePhoto};
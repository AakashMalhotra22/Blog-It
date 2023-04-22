// Validation for create post
const validateCreatePost = (req,res,next)=>{
    const expectedFileType = ['png', 'jpg', 'jpeg', 'webp'];
    if(!req.file)
    {
        return res.status(404).json({"msg": "Upload an Image"});
    }
    const {originalname} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];

    if(!expectedFileType.includes(ext))
    {
        return res.status(403).json({"msg": "You can only upload Image"});
    }
    next();
}
module.exports = {validateCreatePost};
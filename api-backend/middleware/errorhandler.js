// for handling the errors which are not considered.
const errorHandlerMiddleware = async (err, req, res, next) => 
  {
    return res.status(500).json({ msg: 'Something went wrong, please try again', msg1: err})
  }
  
module.exports = errorHandlerMiddleware
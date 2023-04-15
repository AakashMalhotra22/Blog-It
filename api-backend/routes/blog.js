const express = require('express');
const router = express.Router();

router.route('/register').post(async(req,res)=>
{
    console.log(req.body);
    res.send("Hi");   
})

module.exports = router;

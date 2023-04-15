require('dotenv').config();

const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors());

app.post('/api/v1/register',(req,res)=>
{
    res.send("hello Aakash");   
})
console.log(process.env.PORT);

app.listen(process.env.PORT,()=>
{
    console.log(`server is listening on port ${process.env.PORT}`)
});
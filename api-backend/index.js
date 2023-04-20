require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

var cors = require('cors');
const connectDB = require('./db/connect');
const authroute = require('./routes/auth');
const blogroute = require('./routes/blog');
const errorHandlerMiddleware = require('./middleware/errorhandler');

// middleware
app.use(cors());
app.use(express.json());

//image route
app.use('/uploads',express.static(__dirname +'/uploads'));
// login and register route
app.use('/api/v1/auth', authroute);
// post route
app.use('/api/v1/blog', blogroute);
app.use(errorHandlerMiddleware);

console.log(process.env.PORT);

const start = async ()=>
{
    try
    {
        await connectDB(process.env.MONGO_URL);
        console.log("MONGO is Connected")
        app.listen(process.env.PORT,()=>
        {
            console.log(`Server is listening on Port ${process.env.PORT}`)
        })
    }
    catch(error){
        console.log(error);
    }
}
start();

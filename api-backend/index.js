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

// user route - login, register
app.use('/api/v1/auth', authroute);

// Blogs route
app.use('/api/v1/blog', blogroute);

// Error Handle route
app.use(errorHandlerMiddleware);

// connecting with database
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

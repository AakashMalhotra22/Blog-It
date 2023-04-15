require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

var cors = require('cors');
const connectDB = require('./db/connect');
const authroute = require('./routes/auth');
const errorHandlerMiddleware = require('./middleware/errorhandler');

// middleware
app.use(cors());
app.use(express.json());

// app.use('/api/v1/notes/', blogroute);
app.use('/api/v1/auth', authroute);
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

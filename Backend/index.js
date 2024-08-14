require('dotenv').config();

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const connectDatabase = require('./config/database');
connectDatabase();


//Setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


//import all routes
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

const errorMiddleware = require('./Middlewares/errors');


app.use('/api', userRoutes);
app.use('/api', propertyRoutes);

//Error middleware
app.use(errorMiddleware)


//Handle Uncaught execptions 
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down server due to uncaught execpions');
    process.exit(1);
} )

//Handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection')
    server.close(() => {
        process.exit(1)
    })
})


const port = process.env.PORT || 3100;

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsyncErrors = require('../Middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

const Test = require('../models/testModel');


const JWT_SECRET = process.env.JWT_SECRET


//create user
exports.createUser = catchAsyncErrors( async (req, res) => {
  
    const user = await User.create( req.body)
    res.status(201).json({message: 'User registered successfully', user})

})


//login logic
exports.login = catchAsyncErrors(async (req, res) => {
  const { phone, password } = req.body;

    //Checks if email and password is entered by user
    if (!phone|| !password) {
        return next(new ErrorHandler('Please enter phone number & password', 400))
    }
    // finding user in database
    const user = await User.findOne({ phone }).select('+password')
    // console.log('user found:', user)

    if (!user) {
        return next(new ErrorHandler('Invalid phone or password', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid phone or password', 401));
    }

    //Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' })
    
    res.cookie('token', token, { httpOnly: true, maxAge: 36000000 }) // 10 hour
    res.json({ message: 'Login successful' });

})

//testing purposes
exports.testuser = catchAsyncErrors( async (req, res, next) => {
    const user = await Test.create(req.body)
    res.status(200).json({ message: 'ok', user})
})
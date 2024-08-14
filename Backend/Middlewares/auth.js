const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/errorHandler')

const User = require('../models/userModel')


exports.isAuthenticatedUser = async (req, res, next) => {
  const {token} = req.cookies

  if (!token) {
        return next(new ErrorHandler(' Login first to access this resource.', 401))
    }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    console.log("req.user", req.user)
    next();
  } catch (err) {
    res.status(403).json({ message: 'Forbidden' });
  }
};

// Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
            new ErrorHandler(`Role (${req.user.role}) is not allowed to access the resource`, 403))     
        }  
        next()
    }
}



const express = require('express');
const Bid = require('../models/bidModeld'); 
const Product = require('../models/propertyModel'); 
const User = require('../models/userModel');  
const catchAsyncErrors = require('../Middlewares/catchAsyncErrors');



// Endpoint to place a bid
exports.createBid =  catchAsyncErrors(async (req, res) => {
  
    const { bidAmount, userId, productId } = req.body;

  // Validate and fetch user and product
  const user = await User.findById(userId);
  const product = await Product.findById(productId);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  if (!product) {
    return res.status(400).json({ message: 'Product not found' });
  }

  // Create and save the bid
  const bid = new Bid({
    bidAmount,
    bidder: user._id,
    product: product._id
  });

  await bid.save();

  res.status(201).json({
    success: true,
    bid
  })
})




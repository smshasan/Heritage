const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  bidAmount: {
    type: Number,
    required: true
  },
  bidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
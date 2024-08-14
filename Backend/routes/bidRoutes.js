const express = require('express');
const { createBid } = require('../controllers/bidController');
const { isAuthenticatedUser, authorizeRoles } = require('../Middlewares/auth');
const router = express.Router();


router.route('/bid/create').post(isAuthenticatedUser, authorizeRoles('bidder'), createBid)

module.exports = router
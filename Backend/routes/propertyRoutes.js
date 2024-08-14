const express = require('express');
const { createProperty, getProperties, getProperyById } = require('../controllers/propertyController');
const router = express.Router();

const { authorizeRoles, isAuthenticatedUser } = require('../Middlewares/auth');

router.route('/property/create').post(isAuthenticatedUser, authorizeRoles('property owner'), createProperty)
router.route('/property/find').get(isAuthenticatedUser, getProperties)
router.route('/property/find/:id').get(isAuthenticatedUser, getProperyById)

module.exports = router;
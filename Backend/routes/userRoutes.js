const express = require('express');
const { createUser, login, testuser } = require('../controllers/userController');
const router= express.Router();

router.route('/user/create').post(createUser);
router.route('/user/login').post(login)
// router.route('/user/test').post(testuser)


module.exports = router;
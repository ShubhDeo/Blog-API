const express = require('express');
const router = express.Router();

const {registerUser, loginUser} = require('../controllers/userController.js');


//Route : /api/users/
//@DESC public route : POST register user.
router.route('/').post(registerUser);

//Route : /api/users/login
//@DESC public route : POST login user.
router.route('/login').post(loginUser);



module.exports = router;
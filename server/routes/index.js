var express = require('express');
var router = express.Router();
const checkEmail = require('../helpers/checkRegisteredEmail');
const User = require('../controllers/user');
/* GET home page. */
router.post('/register', checkEmail, User.register);
router.post('/login', User.login)
module.exports = router;

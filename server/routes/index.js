var express = require('express');
var router = express.Router();
const authentication = require('../helpers/authentication');
const checkEmail = require('../helpers/checkRegisteredEmail');
const User = require('../controllers/user');
/* GET home page. */
router.post('/register', checkEmail, User.register);
router.post('/login', User.login)
router.get('/getInfo', authentication, User.getInfo)
module.exports = router;

const Post = require('../controllers/post');
const authentication = require('../helpers/authentication');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', authentication, Post.create);
router.get('/', Post.findAll)
router.put('/:id', Post.edit)
router.delete('/:id', Post.remove)
module.exports = router;

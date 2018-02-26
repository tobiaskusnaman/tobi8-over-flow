const Post = require('../controllers/post');
const authentication = require('../helpers/authentication');
const CommentController = require('../controllers/comment');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', authentication, Post.create);
router.get('/', Post.findAll)
router.put('/:id', Post.edit)
router.delete('/:id', Post.remove)
router.post('/:id/comment', CommentController.create)

module.exports = router;

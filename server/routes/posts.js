const Post = require('../controllers/post');
const authentication = require('../helpers/authentication');
const CommentController = require('../controllers/comment');
var express = require('express');
var router = express.Router();

router.post('/', authentication, Post.create);
router.get('/', Post.findAll)
router.put('/:id', Post.edit)
router.delete('/:id', Post.remove)
router.post('/:id/post/:postId/vote', Post.vote)
router.post('/:id/comment', CommentController.create)
router.delete('/:id/comment/:commentId', CommentController.remove)
router.post('/:id/comment/:commentId/vote', CommentController.vote)

module.exports = router;

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
router.delete('/:id/comment/:commentId', CommentController.remove)
// router.post('/:id/comment/:commentId/voteup', Post.voteUp)
router.post('/:id/comment/:commentId/voteUp', CommentController.voteUp)
router.post('/:id/comment/:commentId/voteDown', CommentController.voteUp)

module.exports = router;

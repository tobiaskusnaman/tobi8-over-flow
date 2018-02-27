const CommentModel = require('../models/comment');
const Post = require('../models/post');
class CommentController {
  constructor() {

  }

  static create (req,res){
    let newComment = {
      comment : req.body.comment,
      userId: req.body.userId
    }
    CommentModel.create(newComment)
    .then(newComment => {
      Post.findByIdAndUpdate(req.params.id, {
        "$push": { "comment": newComment }
      })
        .then(data => {
          res.status(200).send({
            data: data,
            msg: 'comment has been added'
          })
        })
        .catch(err => {
          res.send({
            msg: 'add comment error',
            err
          })
        })
    })
    .catch(err => {
      res.status(500).send({
        msg : 'add comment error',
        err
      })
    })
  }

  static remove (req,res) {
    CommentModel.remove({
      _id : req.params.commentId
    })
    .then(data => {
      res.send({
        msg : 'a comment has been deleted',
        data
      })
    })
    .catch(err => {res.send({
        msg : 'delete comment is failed',
        err
      })
    })
  }

  static vote (req,res) {
    CommentModel.findById(req.params.commentId,{
      votes: { $elemMatch: {$eq: req.params.id}}
    })
      .then(user => {
        if (user.votes.length === 0) {
          //tambahin vote klo dapet
          CommentModel.findByIdAndUpdate(req.params.commentId, {
            "$push": {
              "votes": req.params.id
            }
          })
            .then(data => {
              res.send(data)
            })
            .catch(err => {
              res.send(err)
            })
        } else {
          //unlike vote
          CommentModel.update({
            _id : req.params.commentId
          }, {
            "$pull": {
              "votes": { $in : [req.params.id]}
              }
          })
            .then(data => {
              res.send(data)
            })
            .catch(err => {
              res.send(err)
            })
        }
      })
      .catch(err => {
        res.send(err)
      })
  }
}
module.exports = CommentController;

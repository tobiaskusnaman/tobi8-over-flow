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

//   var commentSchema = new Schema({
//   content: [String]
// });
//
// var postSchema = new Schema({
//   comments: [{type: Schema.ObjectId, ref: 'Comment'}]
// });

 //  var ids = ['50478c35889a450000000001',  '50478c35889a450000000002'];
 //
 // Post.findById(req.param('post_id'))
 //    .select({ comments: { $elemMatch: {$in: ids }}})
 //    .exec(function (err, doc) {
 //         console.log(doc.comments); //  ['50478c35889a450000000001'] <- returns only one comment id
 //         done(err);
 // });

 // Posts.findById(req.param('post_id'))
 //   .where('comments', { $elemMatch: {$in: ids }})
 //   .exec(function(err, doc) {
 //      console.log(doc.comments);
 //      done(err);
 //    });

  static voteUp (req,res) {
    CommentModel.findById(req.params.commentId,{
      votes: { $elemMatch: {$eq: req.params.id}}
    })
      .then(user => {
        if (user.votes.length === 0) {
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
          CommentModel.update({
            _id : req.params.commentId
          }, {
            "$pull": {
              "votes": { $in : [req.params.id]}
              }
          })
            .then(data => {
              console.log(data);
              res.send(data)
            })
            .catch(err => {
              console.log(err);
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

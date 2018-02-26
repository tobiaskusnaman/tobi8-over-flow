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

  // static edit(req,res){
  //   let userEdited = {
  //     email : req.body.email,
  //     password : req.body.password,
  //     name : req.body.name,
  //     address : req.body.address,
  //   }
  //   Customer.findOneAndUpdate({
  //     _id : req.params.id
  //   }, userEdited )
  //   .then(user => {
  //     res.send({
  //       msg : 'a user has been edited',
  //       data : user
  //     })
  //   })
  //   .catch(err=>{
  //     res.send({
  //       msg : 'edit failed',
  //       err
  //     })
  //   })
  // }
  //
  // static remove(req,res){
  //   Customer.remove({
  //     _id : req.params.id
  //   })
  //   .then(user => {
  //     res.send({
  //       msg : 'a customer has been deleted',
  //       data : user
  //     })
  //   })
  //   .catch(err => {res.send({
  //     msg : 'delete failed',
  //     err
  //   })})
  // }
}
module.exports = CommentController;

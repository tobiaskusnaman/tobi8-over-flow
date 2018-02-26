const Post = require('../models/post');
class PostController {
  constructor() {
  }

  static create (req, res) {
    let newPost = {
      question: req.body.question,
      description: req.body.description,
      userId: req.body.userId,
      vote: [],
      comment: []
    }
    Post.create(newPost)
    .then(newPost => {
      res.status(200).send({
        msg : 'a post has been posted',
        data : newPost
      })
    })
    .catch(err => {
      res.status(500).send({
        msg : 'create post is error',
        err
      })
    })
  }

  static findAll (req, res) {
    Post.find()
      .then(posts => {
        res.status(200).send({
          msg: 'posts are found',
          data: posts
        })
      })
      .catch(err => {
        res.status(500).send({
          err
        })
      })
  }

  static edit(req,res){
    let postEdited = {
      question : req.body.question,
      description : req.body.description
    }
    Post.findOneAndUpdate({
      _id : req.params.id
    }, postEdited )
    .then(post => {
      res.send({
        msg : 'a post has been edited',
        data : post
      })
    })
    .catch(err=>{
      res.send({
        msg : 'edit post is failed',
        err
      })
    })
  }

  static remove(req,res){
    Post.remove({
      _id : req.params.id
    })
    .then(post => {
      res.send({
        msg : 'a post has been deleted',
        data : post
      })
    })
    .catch(err => {
      res.send({
      msg : 'delete failed',
      err
      })
    })
  }
}
module.exports = PostController;

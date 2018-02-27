const Post = require('../models/post');
class PostController {
  constructor() {
  }

  static create (req, res) {
    let newPost = {
      question: req.body.question,
      description: req.body.description,
      userId: req.headers.decoded.data._id,
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
      .populate('userId')
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

  static vote (req,res) {
    Post.findById(req.params.postId, {
      votes: { $elemMatch: {$eq: req.params.id}}
    })
      .then(user => {
        if (user.votes.length === 0) {
          //tambahin vote klo dapet
          Post.findByIdAndUpdate(req.params.postId, {
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
          Post.update({
            _id : req.params.postId
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

  static findByUserId (req,res) {
    Post.find({
      userId: req.params.userId
    })
      .populate('comment')
      .then(post => {
        res.send({
          msg: 'posts are found',
          post
        })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static findById (req,res) {
    Post.findById(req.params.postId)
      .populate('comment comment.userId')
      // .populate('')
      .then(post => {
        res.send({
          msg: 'post is found',
          data: post
        })
      })
      .catch(err => {
        res.send(err)
      })
  }
}
module.exports = PostController;

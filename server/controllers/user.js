const User = require('../models/user');
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

class UserController {
  constructor() {
  }

  static register(req,res){
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        let newUser = {
          email : req.body.email,
          password : hash,
          username : req.body.username
        }
        User.create(newUser)
        .then(newUser => {
          res.status(200).send({
            msg : 'a new user has been registered',
            data : newUser
          })
        })
        .catch(err => {
          res.status(500).send({
            msg : 'register error',
            err
          })
        })
      });
    });
  }

  static login(req,res){
    User.findOne({
      email : req.body.email
    })
    .then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password)
        .then(function(result) {
          if (result) {
            let token = jwt.sign({
                data: user
              }, 'secret');
              res.send({
                msg: `${user.username} is login`,
                data: [token, user]
              })
          } else {
            res.status(200).send({
              msg : 'incorrect email or password'
            })
          }
        })
        .catch (err => {
          console.log(err);
        })
      } else {
        res.status(200).send({
          msg : 'incorrect email or password'
        })
      }
    })
    .catch(err=>{
      res.status(500).send({
        msg : 'login error',
        err
      })
    })
  }
}
module.exports = UserController;

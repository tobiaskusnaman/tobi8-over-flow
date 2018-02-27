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
          UserController.sendEmail(newUser)
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

  static sendEmail (user) {
    const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
      service : 'gmail',
      secure  : false,
      port    : 5432,
      auth    : {
        user: 'keretakuapp@gmail.com',
        pass: 'keretakuapp123'
      },
      tls:{
        rejectUnauthorized: false
      }
    })

    let HelperOptions = {
      from    : "KeretakuApp" <'keretakuapp@gmail.com',
      to      : user.email,
      subject : "Welcome to tobi8-overflow",
      text    : `
Congrats! Your account has successfully been created :)

By being part of the tobi8-overflow community, you can practice and improve your programming skills while helping each other.

P.S. To have an even better experience, you can invite your friends, and schoolmates.
    `
    };

    transporter.sendMail(HelperOptions, (err, info)=>{
      if(err){
         return console.log(err);
      } else {
        console.log("The message was sent!");
        console.log(info);
      }
    })
  }

  static getInfo (req,res) {
    res.send({
      data: req.headers.decoded.data
    })
  }
}
module.exports = UserController;

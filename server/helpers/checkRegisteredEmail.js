const User = require('../models/user');
function checkRegisteredEmail(req,res,next) {
  User.findOne({
    email : req.body.email
  })
    .then(registeredUser => {
      if (registeredUser) {
        res.send({
          msg: 'email has been registered'
        })
      }
      else {
        next()
      }
    })
}


module.exports = checkRegisteredEmail;

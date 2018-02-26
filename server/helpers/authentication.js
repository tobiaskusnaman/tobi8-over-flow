var jwt = require('jsonwebtoken');
function authentication(req,res,next) {
    jwt.verify(req.headers.token, 'secret', function(err, decoded) {
      if (err) {
        res.send(err)
      } else {
        req.headers.decoded = decoded
        next()
      }
  });
}

module.exports = authentication;

const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema  = new Schema({
  username: String,
  email: String ,
  password: String
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema)

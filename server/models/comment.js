const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CommentSchema  = new Schema({
  comment: String,
  username: String,
  votes: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema)

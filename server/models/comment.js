const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost/overflow');

var CommentSchema  = new Schema({
  comment: String,
  userId: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema)
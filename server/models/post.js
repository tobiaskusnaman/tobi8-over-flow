const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost/overflow');

var PostSchema  = new Schema({
  question: String,
  description: String,
  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  votes: [{
    type: Schema.Types.ObjectId, ref: 'User',
    point: {
      type: Boolean
    }
  }],
  comment: [{
    type: Schema.Types.ObjectId, ref: 'Comment'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema)

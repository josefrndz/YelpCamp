const mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
  test: String,
  author: String
});

module.exports = mongoose.model('Comment', commentSchema);

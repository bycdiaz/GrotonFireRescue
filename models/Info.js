const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const pageSchema = mongoose.Schema({
  pageID: {
    type: String,
    required: true,
  },
  pageTitle: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

// TODO update defaults on save

module.exports = mongoose.model('Page', pageSchema);

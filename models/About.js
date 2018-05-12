const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const aboutSchema = mongoose.Schema({
  pageTitle: {
    type: String,
    required: true,
  },
  pageLinkName: {
    type: String,
    required: true,
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

module.exports = mongoose.model('About', aboutSchema);

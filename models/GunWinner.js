const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const winnerSchema = mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
  },
  date: {
    type: Date,
    required: true,
  },
  gun: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Winner', winnerSchema);

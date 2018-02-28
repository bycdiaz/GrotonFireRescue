const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const trainingSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  start: {
    type: Date,
    required: true
  },
  end: Date
});

module.exports = mongoose.model("Training", trainingSchema);
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const trainingSchema = mongoose.Schema({
  title: {
    type: String,
    required: "You must enter a title",
  },
  location: {
    type: String,
    required: true
  },
  info: String,
  start: {
    type: Date,
    required: "You must enter a date and time"
  },
  end: Date
});

module.exports = mongoose.model("Training", trainingSchema);
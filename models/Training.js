const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const trainingSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date
});

module.exports = mongoose.model("Exercise", trainingSchema);
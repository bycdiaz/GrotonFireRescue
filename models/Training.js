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
  date: {
    start: {
      type: Date,
      required: "You must enter a date and time"
    },
    end: Date
  }
});

trainingSchema.virtual('dateTimeRange').get(function(){ //TODO format date
  const date = this.date.start
  return date.toLocaleDateString('en-US', {month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit"});
});

module.exports = mongoose.model("Training", trainingSchema);
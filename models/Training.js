const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const trainingSchema = mongoose.Schema({
  title: {
    type: String,
    required: 'You must enter a title',
  },
  location: {
    type: String,
    required: true,
  },
  info: String,
  date: {
    start: {
      type: Date,
      required: 'You must enter a date and time',
    },
    end: Date,
  },
});

trainingSchema.virtual('dateTimeRange').get(function formatDate() { // TODO rename to formatDate
  const date = this.date.start;
  return date.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
  });
});

trainingSchema.methods.hoursIn12 = function hoursIn12(date) {
  const hours = date.getHours();
  if (hours > 11) {
    return hours - 12;
  }
  return hours;
};

trainingSchema.methods.periodOf = function periodOf(date) {
  if (date.getHours() > 11) {
    return 'pm';
  }
  return 'am';
};

module.exports = mongoose.model('Training', trainingSchema);

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
    },
    end: Date,
    other: String,
  },
  trainingType: String,
});

trainingSchema.virtual('dateTimeRange').get(function formatDate() {
  const date = this.date.start;
  return date.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
  }, { timezone: 'America/Chicago' });
});

trainingSchema.virtual('whenMessage').get(function formatDate() {
  const time = this.date.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }, { timezone: 'America/Chicago' });
  return `${this.date.other} - ${time}`;
});

trainingSchema.methods.hoursIn12 = function hoursIn12(date) {
  const hours = date.getHours();
  if (hours > 12) {
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

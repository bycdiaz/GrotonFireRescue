const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Training = mongoose.model('Training');

exports.trainingSchedule = (req, res, next) => {
  Training.find().sort('date.start')
    .then((trainingDays) => {
      res.render('training/training', { trainingDays });
    })
    .catch(err => next(err));
};

exports.editTrainingSchedule = (req, res, next) => {
  res.render('training/editTraining');
};

exports.deleteTrainingDay = (req, res, next) => {
  res.send('Remove training day');
};

exports.newTrainingDay = (req, res) => {
  res.render('training/editTrainingDay');
};

exports.createTrainingDay = (req, res, next) => {
  const trainingDay = new Training({
    title: req.body.title,
    info: req.body.info,
    location: req.body.location,
    date: formatStartEndDateTime(req.body),
  });

  trainingDay.save()
    .then(() => {
      req.flash('success', 'Training day added');
      res.redirect('/training');
    })
    .catch(err => next(err));
};

exports.editTrainingDay = (req, res, next) => {
  res.send('Edit training Day');
};

exports.updateTrainingDay = (req, res, next) => {
  // Training.findOneAndUpdate({})
  res.send('Update Training Day');
};


function formatStartEndDateTime(body) {
  const startHour = convertTo24(body.hour, body.period);
  const endHour = convertTo24(body.endHour, body.endPeriod);
  return {
    start: new Date(body.year, body.month - 1, body.day, startHour, body.minute),
    end: new Date(body.year, body.month - 1, body.day, endHour, body.endMinute),
  };
}


function convertTo24(hour, period) {
  if (period === 'pm') return Number(hour) + 12;
  return Number(hour);
}

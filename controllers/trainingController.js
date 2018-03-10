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

exports.deleteTrainingDay = (req, res) => {
  Training.findOneAndRemove({ _id: req.body.trainingID })
    .then(() => res.status(204).send(''))
    .catch(err => res.status(501).send(err));
};

exports.editTrainingDay = (req, res, next) => {
  Training.findById(req.params.id)
    .then((trainingDay) => {
      res.render('training/editTrainingDay', { trainingDay });
    })
    .catch(err => next(err));
};

exports.createTrainingDay = (req, res, next) => { // TODO - combine with update route
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

exports.updateTrainingDay = (req, res) => { // TODO make this work
  res.json(req.body);
  // Training.findOneAndUpdate({_id: req.body.id, req.body})
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

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

exports.createTrainingDay = (req, res, next) => {
  const trainingDay = new Training({
    title: req.body.title,
    info: req.body.info,
    location: req.body.location,
    date: getDateObj(req.body),
    trainingType: req.body.repeat ? 'repeat' : 'special',
  });

  trainingDay.save()
    .then(() => {
      req.flash('success', 'Training day added');
      res.redirect('/training');
    })
    .catch(err => next(err));
};

exports.updateTrainingDay = (req, res, next) => {
  Training.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    info: req.body.info,
    localtion: req.body.location,
    date: getDateObj(req.body),
    trainingType: req.body.repeat ? 'repeat' : 'special',
  }).then(() => {
    res.redirect('/training');
  }).catch(next);
};

function getDateObj(body) {
  if (body.repeat) {
    return {
      start: formatRepeatStartTime(body),
      end: formatRepeatEndTime(body),
      other: body.other,
    };
  }
  return formatStartEndDateTime(body);
}

function formatRepeatStartTime(body) {
  const date = new Date();
  const startHour = convertTo24(body.hour, body.period);
  date.setHours(startHour, body.minute, 0, 0);
  return date;
}

function formatRepeatEndTime(body) {
  const date = new Date();
  const endHour = convertTo24(body.endHour, body.endPeriod);
  date.setHours(endHour, body.endMinute, 0, 0);
  return date;
}

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

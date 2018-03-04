const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Training = mongoose.model('Training');

exports.trainingSchedule = (req, res, next) => {
  Training.find()
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
    date: {
      start: formatStartEndDateTime(req.body),
      end: Date.parse(`${req.body.date} ${req.body.endTime}`),
    },
  });

  trainingDay.save()
    .then((training) => {
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
  const hour = convertTo24(body.hour, body.ampm);
  return new Date(body.year, body.month - 1, body.day, hour, body.minute);
}

function convertTo24(hour, ampm) {
  let hour24 = Number(hour);
  if (ampm === 'pm') hour24 += 12;

  return hour24;
}
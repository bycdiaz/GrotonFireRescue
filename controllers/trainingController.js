const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Training = mongoose.model('Training');

exports.trainingSchedule = (req, res, next) => {
  Training.find()
    .then((trainingDay) => {
      res.json(trainingDay);
    })
    .catch(err => next(err));
}

exports.editTrainingSchedule = (req, res, next) => {
  res.render('training/editTraining');
}

exports.deleteTrainingDay = (req, res, next) => {
  res.send("Remove training day")
}

exports.newTrainingDay = (req, res) => {
  res.render('training/editTrainingDay');
}

exports.createTrainingDay = (req, res, next) => {
  const trainingDay = new Training({
    title: req.body.title, 
    info: req.body.info,
    location: req.body.location,
    start: Date.parse(req.body.date + " " + req.body.startTime),
    end: Date.parse(req.body.date + " " + req.body.endTime)
  });

  trainingDay.save()
    .then(training => {
      req.flash('success', 'Training day added');
      res.redirect('/training');
    })
    .catch(err => {return next(err)});
}

exports.editTrainingDay = (req, res, next) => {
  res.send("Edit training Day");
}

exports.updateTrainingDay = (req, res, next) => {
  // Training.findOneAndUpdate({})
  res.send("Update Training Day");
}

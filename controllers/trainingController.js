const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Training = mongoose.model('Training');

exports.trainingSchedule = (req, res, next) => {
  Training.find().sort({start: -1})
    .then((stuff) => {
      res.send(stuff);
    })
    .catch(err => {return next(err)});
  // res.send(req.query.test)
}

exports.createTrainingDay = (req, res, next) => {
  
}

exports.editTrainingSchedule = (req, res, next) => {
  res.render('training/editTraining');
}

exports.editTrainingDay = (req, res, next) => {
  res.send("Edit training Day");
}

exports.updateTrainingDay = (req, res, next) => {
  // Training.findOneAndUpdate({})
  res.send("Update Training Day");
}

exports.deleteTrainingDay = (req, res, next) => {
  res.send("Remove training day")
}
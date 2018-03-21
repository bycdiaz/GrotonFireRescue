const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Winner = mongoose.model('Winner');

exports.index = (req, res) => {
  Winner.find()
    .then((winners) => {
      res.render('gunDrawing/index', { winners });
    });
};

exports.addWinner = (req, res) => {
  res.render('gunDrawing/editWinner');
};

exports.createWinner = (req, res, next) => {
  const date = new Date(req.body.year, req.body.month - 1, req.body.day);
  const winner = new Winner({
    name: {
      first: req.body.firstName,
      last: req.body.lastName,
    },
    gun: req.body.gun,
    date,
  });
  winner.save()
    .then(() => {
      res.redirect('/gun-drawing/add');
    })
    .catch(next);
};

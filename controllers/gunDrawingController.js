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
  const winner = new Winner(makeWinnerObj(req.body));

  winner.save()
    .then(() => {
      res.redirect('/gun-drawing/add');
    })
    .catch(next);
};

exports.editWinner = (req, res, next) => {
  Winner.findById(req.params.id)
    .then((winner) => {
      res.render('gunDrawing/editWinner', { winner });
    })
    .catch(next);
}

exports.updateWinner = (req, res, next) => {
  const winner = makeWinnerObj(req.body);

  Winner.findByIdAndUpdate(req.params.id, winner)
    .then(() => {
      res.redirect('/gun-drawing');
    })
    .catch(next);
};


function makeWinnerObj(body) {
  const date = new Date(body.year, body.month - 1, body.day);
  return {
    name: {
      first: body.firstName,
      last: body.lastName,
    },
    gun: body.gun,
    date,
  };
}

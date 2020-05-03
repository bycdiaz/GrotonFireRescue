const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Winner = mongoose.model('Winner');

exports.index = (req, res) => {
  Winner.find().sort({ date: -1 })
    .then((winners) => {
      let allYears = []
      const date = new Date();
      const currentYear = date.getFullYear().toString();
      
      winners.forEach(winner => {
        const winnerYear = Number(winner.date.getFullYear());
        !allYears.includes(winnerYear) ? allYears.push(winnerYear) : null;
      });
      res.render('gunDrawing/index', { winners, title: 'Gun-Drawing Winners', allYears, currentYear});
    });
};

exports.addWinner = (req, res) => {
  res.render('gunDrawing/editWinner', { title: 'Add Winner' });
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
      res.render('gunDrawing/editWinner', { title: 'Edit Winner', winner });
    })
    .catch(next);
};

exports.updateWinner = (req, res, next) => {
  const winner = makeWinnerObj(req.body);

  Winner.findByIdAndUpdate(req.params.id, winner)
    .then(() => {
      res.redirect('/gun-drawing');
    })
    .catch(next);
};

exports.deleteWinner = (req, res) => {
  Winner.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(500).send();
    });
};

function makeWinnerObj(body) {
  const date = new Date(body.year, body.month - 1, body.day);
  return {
    name: {
      first: body.firstName,
      last: body.lastName,
    },
    location: body.location,
    gun: body.gun,
    date,
  };
}

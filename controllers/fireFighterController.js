const mongoose = require('mongoose');
const Firefighter = mongoose.model('Firefighter');

exports.fireFighters = (req, res) => {
  Firefighter.find()
    .then((firefighter) => {
      console.log(firefighter);
      res.render('firefighters/firefighters');
    })
}
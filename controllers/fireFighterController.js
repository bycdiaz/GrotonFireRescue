const mongoose = require('mongoose');
const Firefighter = mongoose.model('Firefighter');

exports.fireFighters = (req, res) => {
  Firefighter.find()
    .then((firefighters) => {
      console.log(firefighters);
      res.render('firefighters/firefighters');
    })
}
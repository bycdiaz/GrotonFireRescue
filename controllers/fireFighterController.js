const mongoose = require('mongoose');
const Firefighter = mongoose.model('Firefighter');

exports.fireFighters = (req, res) => {
  Firefighter.find()
    .then((firefighters) => {
      console.log(firefighters);
      res.render('firefighters/firefighters');
    })
};

exports.editFirefightersForm = (req, res) => {
  res.render('admin/firefighters/editFireFighters');
};

exports.editFirefighters = (req, res) => {
  Firefighter.create(req.body.newFirefighters)
    .then((err) => {
      if(err) return next(err);
    });

  removefirefighters(req.body.oldFirefighters)
  res.redirect("/admin-panel");
};

function removefirefighters(oldFirefighters){
  oldFirefighters.forEach((firefighter) => {
    Firefighter.findOneAndRemove({name: {first: firefighter.firstName, last: firefighter.lastName}}, (err) => {
      if(err) return next(err);
    });
  });
};

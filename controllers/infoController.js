const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.index = (req, res) => {
  res.send("index page for info");
};

exports.aboutGroton = (req, res) => {
  res.render('info/aboutGroton');
};

exports.aboutFireTaxDistrict = (req, res) => {
  res.render('info/aboutFireTaxDistrict');
};

exports.aboutRescueSquad = (req, res) => {
  res.render('info/aboutRescueSquad');
};

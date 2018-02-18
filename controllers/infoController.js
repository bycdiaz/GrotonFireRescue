const mongoose = require('mongoose');
const Post = mongoose.model('Post');

module.getAboutGroton = (req, res) => {
  res.render('info/aboutGroton');
}

module.getAboutFireTaxDistrict = (req, res) => {
  res.render('info/aboutFireTaxDistrict');
}

module.getAboutRescueSquad = (req, res) => {
  res.render('info/aboutRescueSquad');
}

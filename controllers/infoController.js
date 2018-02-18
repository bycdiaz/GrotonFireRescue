const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.index = (req, res) => {
  res.send("index page for info");
};


// About Groton
exports.aboutGroton = (req, res, next) => {
  Post.findOne({pageID: 1})
    .then((page)=> {
      res.render('info/aboutGroton', page);
    })
    .catch((err) => {
      next(err);
    });
};

exports.editAboutGroton = (req, res, next) => {
  Post.findOne({pageID: 1})
    .then((page) => {
      res.render('info/editAboutGroton', page)
    })
    .catch((err) => {
      next(err);
    })
};

exports.updateAboutGroton = (req, res, next) => {
  // Post.findOneAndUpdate({pageID: 1}, req.body)
  res.json(req.body);
};


// About fire tax district
exports.aboutFireTaxDistrict = (req, res) => {
  res.render('info/aboutFireTaxDistrict');
};


//About rescue squad
exports.aboutRescueSquad = (req, res) => {
  res.render('info/aboutRescueSquad');
};

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Page = mongoose.model('Page');

exports.home = (req, res, next) => {
  Page.find()
    .then((pages) => {
      res.render('homePage', { pages });
    })
    .catch((err) => {
      next(err);
    });
};

exports.editHome = (req, res, next) => {

};

exports.updateHome = (req, res, next) => {

};

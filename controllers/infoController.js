const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Page = mongoose.model('Page');

exports.index = (req, res) => {
  res.render('info/aboutIndex');
};

const pageIDMap = {"fire-tax-district":0, "groton":1, "rescue-squad":2};

exports.aboutPage = (req, res, next) => {
  Page.findOne({pageID: pageIDMap[req.params.page]})
    .then(page => {
      if(!page) return next();
      res.render('info/aboutPage', {page});
    })
    .catch(err => {
      next(err);
    })
};

exports.editAboutPage = (req, res, next) => {
  Page.findOne({pageID: 1})
    .then((page) => {
      if(!page){page = {}};      
      res.render('info/editPage', {page})
    })
    .catch((err) => {
      next(err);
    })
};

exports.updateAboutPage = (req, res, next) => {
  Page.findOneAndUpdate({pageID: 1}, req.body, {upsert: true, runValidators: true, setDefultsOnInsert: true, new: true})
    .then((page) => {
      req.flash("success", "SUCCESSFULLY UPDATED")
      res.redirect('/about/groton');
    })
    .catch((err) => next(err));
};
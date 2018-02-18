const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Page = mongoose.model('Page');

exports.index = (req, res, next) => {
  res.send("index page for info");
};


// About Groton
exports.aboutGroton = (req, res, next) => {
  Page.findOne({pageID: 1})
    .then((page)=> {
      if(!page) page = {};
      res.render('info/aboutGroton', {page});
    })
    .catch((err) => {
      next(err);
    });
};

exports.editAboutGroton = (req, res, next) => {
  Page.findOne({pageID: 1})
    .then((page) => {
      if(!page){page = {}};      
      res.render('info/editAbout', {page})
    })
    .catch((err) => {
      next(err);
    })
};

exports.updateAboutGroton = (req, res, next) => {
  Page.findOneAndUpdate({pageID: 1}, req.body, {upsert: true, runValidators: true, setDefultsOnInsert: true, new: true})
    .then((page) => {
      req.flash("success", "SUCCESSFULLY UPDATED")
      res.redirect('/about/groton');
    })
    .catch((err) => next(err));
};


// About fire tax district
exports.aboutFireTaxDistrict = (req, res, next) => {
  Page.findOne({pageID: 0})
    .then((page) => {
      if(!page) page = {};
      res.render('info/aboutFireTaxDistrict', {page});
    })
    .catch((err) => next(err));
};

exports.editFireTaxDistrict = (req, res, next) => {
  Page.findOne({pageID: 0})
    .then((page) => {
      if(!page) page = {};      
      res.render('info/editAbout');
    })
    .catch((err) => next(err));
}

exports.updateFireTaxDistrict = (req, res, next) => {
  Page.findOneAndUpdate({pageID: 0}, req.body, {upsert: true, runValidators: true, setDefultsOnInsert: true, new: true})
  .then((page) => {
    req.flash("success", "SUCCESSFULLY UPDATED")
    res.redirect('/about/fire-tax-district');
  })
  .catch((err) => next(err));
}


//About rescue squad
exports.aboutRescueSquad = (req, res, next) => {
  Page.findOne({pageID: 2})
    .then((page) => {
      if(!page) page = {};      
      res.render('info/aboutRescueSquad', {page});
    })
    .catch((err) => next(err));
};

exports.editAboutRescueSquad = (req, res, next) => {
  Page.findOne({pageID: 2})
    .then((page) => {
      if(!page) page = {};  
      res.render('info/editAbout', {page});
    })
    .catch((err) => next(err));
};

exports.updateAboutRescueSquad = (req, res, next) => {
  Page.findOneAndUpdate({pageID: 2}, req.body, {upsert: true, runValidators: true, setDefultsOnInsert: true, new: true})
    .then((page) => {
      req.flash("success", "SUCCESSFULLY UPDATED")
      res.redirect('/about/rescue-squad');
    })
    .catch((err) => next(err));
};

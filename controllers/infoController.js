const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
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
      res.render('info/editAbout', page)
    })
    .catch((err) => {
      next(err);
    })
};

exports.updateAboutGroton = (req, res, next) => {
  Post.findOneAndUpdate({pageID: 1}, req.body, {upsert: true, runValidators: true, setDefultsOnInsert: true, new: true})
    .then((post) => {
      req.flash("success", "SUCCESSFULLY UPDATED")
      res.redirect('/about/groton');
    })
    .catch((err) => next(err));
};


// About fire tax district
exports.aboutFireTaxDistrict = (req, res) => {
  res.render('info/aboutFireTaxDistrict');
};

exports.editFireTaxDistrict = (req, res, next) => {
  Post.findOne({pageID: 0})
    .then((page) => {
      res.render('info/editAbout');
    })
    .catch((err) => next(err));
}

exports.updateFireTaxDistrict = (req, res, next) => {
  Post.findOneAndUpdate({pageID: 0}, req.body, {upsert: true, runValidators: true, setDefultsOnInsert: true, new: true})
  .then((post) => {
    req.flash("success", "SUCCESSFULLY UPDATED")
    res.redirect('/about/fire-tax-district');
  })
  .catch((err) => next(err));
}


//About rescue squad
exports.aboutRescueSquad = (req, res) => {
  res.render('info/aboutRescueSquad');
};

exports.editAboutRescueSquad = (req, res, next) => {
  Post.findOne({pageID: 2})
  .then((page) => {
    res.render('info/editAbout');
  })
  .catch((err) => next(err));
};

exports.updateAboutRescueSquad = (req, res, next) => {
  Post.findOneAndUpdate({pageID: 2}, req.body, {upsert: true, runValidators: true, setDefultsOnInsert: true, new: true})
  .then((post) => {
    req.flash("success", "SUCCESSFULLY UPDATED")
    res.redirect('/about/rescue-squad');
  })
  .catch((err) => next(err));
};

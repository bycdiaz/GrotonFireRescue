const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Page = mongoose.model('Page');

exports.home = (req, res, next) => {
  Page.find().sort({ pageID: 'asc' })
    .then((pages) => {
      res.render('homePage', { pages });
    })
    .catch((err) => {
      next(err);
    });
};

exports.editHome = (req, res, next) => {
  Page.find().sort({ pageID: 'asc' })
    .then((pages) => {
      res.render('editHome', { pages });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateHome = (req, res) => {
  const promises = [];

  req.body.forEach((section, pageID) => {
    promises.push(Page.findOneAndUpdate({ pageID }, { ...section, pageID }, { upsert: true }));
  });

  Promise.all(promises)
    .then(() => { res.status(201).send(); })
    .catch((err) => { res.status(503).json(err); });
};

const mongoose = require('mongoose');
const jimp = require('jimp');

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
      res.render('editHome', { title: 'Edit Home Page', pages });
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
    .then(() => { res.status(201).send(''); })
    .catch((err) => { res.status(503).json(err); });
};

exports.uploadImages = (req, res) => {
  Promise.all(req.files.map(file => jimp.read(file.buffer)
    .then((image) => {
      const pageID = req.body[file.originalname];
      image.resize(600, jimp.AUTO);
      image.write(`public/images/home/${pageID}.jpg`);
    })))
    .then(() => res.status(201).send(''))
    .catch(err => res.status(500).send(err));
};

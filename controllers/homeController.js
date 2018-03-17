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
      res.render('editHome', { pages });
    })
    .catch((err) => {
      next(err);
    });

  // TODO - add picture uploading
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

exports.uploadImages = (req, res) => { // TODO - test extensively for issues with upload ordering
  Promise.all(req.files.map((file, index) => jimp.read(file.buffer)
    .then((image) => {
      image.resize(600, jimp.AUTO);
      image.write(`public/images/home/${index}.jpg`);
    })))
    .then(() => res.status(201).send(''))
    .catch(err => res.status(500).send(err));
};

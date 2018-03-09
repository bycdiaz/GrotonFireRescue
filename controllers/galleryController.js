const fs = require('fs');
const path = require('path');

exports.showGalleries = (req, res, next) => {
  dirContents(req.params.category || '', req.params.imageName || '')
    .then(dirList => res.render('gallery/gallery', { dirList }))
    .catch(err => next(err));
};

exports.showGallery = (req, res, next) => {
  next(); // TODO - Show single gallery
}

function dirContents(...contentPath) {
  const directory = path.join(__rootDir, 'public', 'images', 'gallery', ...contentPath);
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, contents) => {
      if (err) reject(err);
      resolve(contents);
    });
  });
}

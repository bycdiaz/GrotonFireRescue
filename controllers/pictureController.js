const fs = require('fs');
const path = require('path');

exports.showGallery = (req, res, next) => {
  dirContents(req.params.category || '', req.params.imageName || '')
    .then(gallery => res.json(gallery))
    .catch(err => next(err));
};

function dirContents(...contentPath) {
  const directory = path.join(__rootDir, 'public', 'images', 'gallery', ...contentPath);
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, contents) => {
      if (err) reject(err);
      resolve(contents);
    });
  });
}

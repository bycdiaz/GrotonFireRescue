const fs = require('fs');
const path = require('path');

exports.showGalleries = (req, res, next) => { // TODO - add thumbnails
  const directory = path.join(__rootDir, 'public', 'images', 'gallery');
  dirContents(directory)
    .then(generateGalleryObjectsArray)
    .then(galleryObj => res.render('gallery/gallery', { galleryObj }))
    .catch(err => next(err));
};

exports.showGallery = (req, res, next) => {
  generateGalleryInCategoryObj('category');
  next(); // TODO - Show single gallery
};

function dirContents(directory) {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, contents) => {
      if (err) reject(err);
      resolve(contents);
    });
  });
}

function generateGalleryObjectsArray(directoryArray) {
  return Promise.all(directoryArray.map(directory => getCategoryThumbnail(directory)
    .then(thumbnail => ({
      name: directory,
      thumbnail,
    }))
    .catch(err => err)));
}

function getCategoryThumbnail(category) {
  return new Promise((resolve, reject) => {
    fs.readdir(path.join(__rootDir, 'public', 'images', 'gallery', category, 'thumbnails'), (err, contents) => {
      if (err) reject(err);
      resolve(contents[0]);
    });
  });
}

function generateGalleryInCategoryObj(category) {
  return (category);
}


// {
//   fileName: String,
//   category: String,
//   thumbnail: String,
// }

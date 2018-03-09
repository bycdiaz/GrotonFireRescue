const fs = require('fs');
const path = require('path');

exports.showGalleries = (req, res, next) => {
  const directory = path.join(__rootDir, 'public', 'images', 'gallery');
  dirContents(directory)
    .then(generateGalleryObjectsArray)
    .then(galleryObj => res.json(galleryObj))
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
  const galleryObjArry = [];

  directoryArray.forEach((category) => {
    getCategoryThumbnail(category)
      .then(thumbnail => galleryObjArry.push(thumbnail));
  });
}

function getCategoryThumbnail(category) {
 // TODO - async get thumbail from route
}

function generateGalleryInCategoryObj(category) {
  return (category);
}


// {
//   fileName: String,
//   category: String,
//   thumbnail: String,
// }

const fs = require('fs');
const path = require('path');

exports.showGalleries = (req, res, next) => { // TODO - add thumbnails
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
  const promises = directoryArray.map((directory) => {
    getCategoryThumbnail(directory)
      .then(thumbnail => ({
        name: directory,
        thumbnail,
      }))
      .catch(err => err);
  });

  return Promise.all(promises)
    .then((objects) => {
      console.log(objects);
      return objects;
    })
    .catch(err => err);
}

function getCategoryThumbnail(category) {
  return new Promise((resolve, reject) => {
    resolve('test');
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

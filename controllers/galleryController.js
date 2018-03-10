const fs = require('fs');
const path = require('path');

exports.showGalleries = (req, res, next) => { // TODO - add thumbnails
  const directory = path.join(__rootDir, 'public', 'images', 'gallery');
  dirContents(directory)
    .then(generateGalleryObjectsArray)
    .then(galleryObj => res.render('gallery/gallery', { galleryObj }))
    .catch(next);
};

exports.showGallery = (req, res, next) => {
  getCategoryThumbs(req.params.category)
    .then(generateImageCards)
    .then(cards => res.render('gallery/category', { cards, category: req.params.category }))
    .catch(next);
};

exports.showImage = (req, res, next) => {
  res.send(`images/gallery/${req.params.category}/${req.params.image}`);
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

function getCategoryThumbs(category) {
  const categoryPath = path.join(__rootDir, 'public', 'images', 'gallery', category, 'thumbnails');
  return new Promise((resolve, reject) => {
    fs.readdir(categoryPath, (err, contents) => {
      if (err) reject(err);
      resolve(contents);
    });
  });
}

function generateImageCards(thumbnails) {
  return thumbnails.map((thumbnail) => {
    const imageName = thumbnail.slice(1);

    return {
      thumb: thumbnail,
      image: imageName,
    };
  });
}

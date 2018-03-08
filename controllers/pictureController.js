const fs = require('fs');

exports.getCategories = (req, res) => {
  // TODO - gather - directoryNames
};

exports.getImages = (req, res) => {
  // TODO - gather images and display
};

exports.getSingleImage = (req, res) => {
  // TODO - returns url of single image based on category and filename
};

exports.edit = (req, res) => { 
  res.render('pictures/editPictures'); // TODO - renders admin page
};

exports.addImage = (req, res) => {
  // TODO - adds image to directory, creating it if it doesnt exist
};

exports.deleteCategory = (req, res) => {
  // TODO - deletes category and images in directory along with thumbnails
};

exports.deleteImage = (req, res) => {
  // TODO - deletes image, takes :category, and :imageName
};

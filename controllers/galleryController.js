exports.index = (req, res) => {
  res.render('gallery/gallery', { galleryObj: req.gallery });
};

exports.category = (req, res) => {
  console.log(req.gallery);
  res.render('gallery/category', { cards: req.gallery });
}

exports.editGallery = (req, res) => {
  res.render('gallery/editGallery');
};

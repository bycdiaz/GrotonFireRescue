exports.index = (req, res) => {
  res.render('gallery/gallery', { galleryObj: req.gallery, title: 'Gallery' });
};

exports.category = (req, res) => {
  res.render('gallery/category', { cards: req.gallery, title: req.params.category });
};

exports.editGallery = (req, res) => {
  res.render('gallery/editGallery', { title: 'Edit Gallery' });
};

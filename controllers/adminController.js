
exports.adminLogin = (req, res) => {
  res.render('admin/adminLogin');
}

exports.adminAuthenticate = (req, res) => {
  //if login flash user
  req.flash('info', 'this is a flash message');
  res.redirect('/admin/admin-panel');
}

exports.adminPanel = (req, res) => {
  res.render('admin/adminPanel');
}

exports.editFireFighters = (req, res) => {
  res.render('admin/editFireFighters');
}
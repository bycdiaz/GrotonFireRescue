
exports.adminLogin = (req, res) => {
  res.render('admin/adminLogin');
}

exports.adminAuthenticate = (req, res) => {
  console.log(res.locals)
  res.redirect('/admin/admin-panel')
}

exports.adminPanel = (req, res) => {
  req.flash('wtf');
  res.render('admin/adminPanel');
}

exports.editFireFighters = (req, res) => {
  res.render('admin/editFireFighters');
}
exports.home = (req, res) => {
  res.render('homePage');
}

express.adminLogin = (req, res) => {
  res.render('admin/adminLogin');
}

express.adminPanel = (req, res) => {
  res.render('admin/adminPanel')
}

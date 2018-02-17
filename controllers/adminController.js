const mongoose = require('mongoose');
const Admin = mongoose.model("Admin");

exports.loginForm = (req, res) => {
  res.render('admin/adminLogin');
};

exports.addAdminForm = (req, res) => {
  res.render('admin/addAdmin');
};

exports.validateRegister = (req, res, next) => {
  //validation
};

exports.registerNewAdmin = (req, res, next) => {
  const admin = new Admin({email: req.body.email, name: req.body.name});
  Admin.register(admin, req.body.password, (err) => {
    if(err) return next(err)
    req.flash('success', "You have registered")
    res.redirect('/admin');
  });
};

exports.adminPanel = (req, res) => {
  res.render('admin/adminPanel');
};

exports.editFireFighters = (req, res) => {
  res.render('admin/editFireFighters');
};

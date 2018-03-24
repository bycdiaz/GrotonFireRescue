const mongoose = require('mongoose');

const Admin = mongoose.model('Admin');

exports.loginForm = (req, res) => {
  res.render('admin/adminLogin');
};

exports.addAdminForm = (req, res) => {
  res.render('admin/addAdmin');
};

exports.validateRegister = (req, res, next) => {
  // TODO - validation of input for admin
};

exports.adminPanel = (req, res, next) => {
  Admin.find()
    .then((admins) => {
      res.render('admin/adminPanel', { admins });
    })
    .catch(next);
};

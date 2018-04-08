const mongoose = require('mongoose');

const Admin = mongoose.model('Admin');

exports.loginForm = (req, res) => {
  res.render('admin/adminLogin', { title: 'Admin Login' });
};

exports.addAdminForm = (req, res) => {
  res.render('admin/addAdmin', { title: 'Add Admin' });
};

exports.validateRegister = (req, res, next) => {
  // TODO - validation of input for admin
};

exports.adminPanel = (req, res, next) => {
  Admin.find()
    .then((admins) => {
      res.render('admin/adminPanel', { title: 'Admin Panel', admins, defaultPassword: process.env.DEFAULT_ADMIN_PASSWORD });
    })
    .catch(next);
};

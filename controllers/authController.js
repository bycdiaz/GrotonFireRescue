const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Admin = mongoose.model("Admin");

exports.login = passport.authenticate('local', {
  failureRedirect: '/admin',
  failureFlash: "Invalid email address or password",
  successRedirect: '/admin/admin-panel',
  successFlash: "You are now logged in"
})

exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "You are now logged out");
  res.redirect('/');
}

exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  req.flash('You must be logged in to do that');
  res.redirect('/admin');
}
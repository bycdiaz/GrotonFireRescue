const mongoose = require('mongoose');
const passport = require('passport');
const Admin = mongoose.model('Admin');


passport.use(Admin.createStrategy());

passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());
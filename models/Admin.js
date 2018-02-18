const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const passportLocalMongoose = require('passport-local-mongoose');
const validator = require('validator');
const md5 = require('md5');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: "Please supply a name"
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: "Please supply an email address"
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

adminSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model('Admin', adminSchema);
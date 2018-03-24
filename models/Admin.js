const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const passportLocalMongoose = require('passport-local-mongoose');
const validator = require('validator');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Please supply a name',
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please supply an email address',
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
  siteAdmin: {
    type: Boolean,
    default: false,
  },
  passReset: {
    type: Boolean,
    default: true,
  },
  resetToken: {
    token: String,
    expires: {
      type: Date,
      default: expireDate(),
    },
  },
  firstLogin: {
    type: Boolean,
    default: true,
  },
});

function expireDate() {
  return new Date(Date.now() + 864e5);
}

adminSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('Admin', adminSchema);

const passport = require('passport');
const mongoose = require('mongoose');

const Admin = mongoose.model('Admin');

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) { return next(err); }

    if (!user) {
      // req.flash('failure', 'You must be logged in to do that');
      console.log('no user');
      return res.redirect('/admin');
    }

    if (user.firstLogin) {
      req.flash('failure', 'Please create your password using the code provided');
      console.log(user);
      return res.redirect('/admin/password-reset');
    }

    // TODO - allow user to reset own password

    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.redirect('/admin/panel');
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  // req.flash('success', 'You are now logged out'); // TODO - style flashes
  res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('You must be logged in to do that');
  res.redirect('/admin');
};

exports.isSuperAdmin = (req, res, next) => {
  if (req.user.isSuperAdmin) { return next(); }
  req.flash('You must be a superAdmin to do that');
  return res.redirect('/admin');
};

exports.register = (req, res, next) => {
  const token = randomResetToken();
  const admin = new Admin({
    email: req.body.email,
    name: req.body.name,
    resetToken: { token },
  });

  Admin.register(admin, process.env.DEFAULT_ADMIN_PASSWORD, (err, user) => {
    if (err) return next(err);

    req.flash('success', `${user.name} has been registered, the reset token is: ${token}`);
    return res.redirect('/admin/panel');
  });
};

exports.resetPasswordPage = (req, res) => { // TODO - test
  res.render('admin/passwordReset', { user: req.params.user, token: req.params.token });
};

exports.resetPassword = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) { return next(err); }

    if (!user) {
      req.flash('failure', 'Email or password is incorrect');
      return res.redirect('/admin/password-reset');
    }

    if (!validateToken(user, req.body.resetToken)) {
      req.flash('failure', 'Please change your password using the provided code and default password');
      return res.redirect('/admin/password-reset');
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      req.flash('failure', 'Passwords do not match');
      return res.redirect('/admin/password-reset');
    }

    user.passReset = false;
    user.firstLogin = false;
    user.changePassword(req.body.password, req.body.newPassword, (err) => {
      if (err) return next(err);
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        return res.redirect('/admin/panel');
      });
    });
    user.save();
  })(req, res, next);
};

exports.resetPassword = (req, res) => {
  const resetToken = randomResetToken();
  Admin.findByIdAndUpdate(req.body.id, {
    passReset: true,
    resetToken: {
      token: resetToken,
    },
  })
    .then(() => {
      res.status(202).json({ resetToken });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.removeAdmin = (req, res) => {
  Admin.findByIdAndRemove(req.body.id)
    .then(() => {
      res.status(204).send('');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.setSuperAdmin = (req, res) => {
  Admin.findByIdAndUpdate(req.body.id, { isSuperAdmin: true })
    .then(() => {
      res.status(202).send('');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};


function randomResetToken() {
  return Math.floor(Math.random() * (9999 - (1111 + 1))) + 1111;
}

function validateToken(user, token) {
  if (user.resetToken.expires > Date.now() && user.resetToken.token === token) {
    return true;
  }
  return false;
}

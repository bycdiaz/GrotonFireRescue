const mongoose = require('mongoose');

const About = mongoose.model('About');

exports.showPage = (req, res, next) => {
  About.findOne({ pageLinkName: req.params.pageName })
    .then(page => {
      if (page) return res.render('about/about', {title: page.pageTitle, page});
      next();
    })
    .catch(console.error);
}

exports.editPage = (req, res) => {
  About.findOne({ pageLinkName: req.params.pageName })
    .then(page => {
      res.render('about/updateAbout', { page });
    })
    .catch(console.error);
}

exports.updatePage = (req, res) => {
  About.findOneAndUpdate({ pageLinkName: req.params.pageName }, { pageTitle: req.body.pageTitle, content: req.body.content }, { upsert: true })
    .then(() => res.redirect(`/about/${req.params.pageName}`))
    .catch(err => res.send(err));
}

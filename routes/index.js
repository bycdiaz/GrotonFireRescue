const express = require('express');
const router = express.Router();

const admin = require('./adminRoutes');
const fireFighters = require('./fireFighterRoutes');
const pictures = require('./picturesRoutes');
const info = require('./infoRoutes');
const training = require('./trainingRoutes');

router.get('/', (req, res) => {
  res.render('homePage');
});

router.use('/admin', admin);
router.use('/fire-fighters', fireFighters);
router.use('/pictures', pictures);
router.use('/about', info);
router.use('/training', training)

module.exports = router;
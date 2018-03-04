const express = require('express');

const router = express.Router();

const home = require('./homeRoutes');
const admin = require('./adminRoutes');
const fireFighters = require('./fireFighterRoutes');
const pictures = require('./picturesRoutes');
const info = require('./infoRoutes');
const training = require('./trainingRoutes');

router.use('/', home);
router.use('/admin', admin);
router.use('/fire-fighters', fireFighters);
router.use('/pictures', pictures);
router.use('/about', info);
router.use('/training', training);

module.exports = router;

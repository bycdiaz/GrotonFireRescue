const express = require('express');

const router = express.Router();

const home = require('./homeRoutes');
const admin = require('./adminRoutes');
const fireFighters = require('./fireFighterRoutes');
const gallery = require('./galleryRoutes');
const training = require('./trainingRoutes');
const gunDrawing = require('./gunDrawingRoutes');

router.use('/', home);
router.use('/admin', admin);
router.use('/fire-fighters', fireFighters);
router.use('/gallery', gallery);
router.use('/training', training);
router.use('/gun-drawing', gunDrawing);

module.exports = router;

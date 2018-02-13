const express = require('express');
const router = express.Router();

const routeController = require('../controllers/routeController.js');
const fireFighterController = require('../controllers/fireFighterController.js');
const pictureController = require('../controllers/pictureController');
const adminController = require('../controllers/adminController');

router.get('/', routeController.home);

router.get('/admin', adminController.adminLogin);
router.get('/adminPanel', adminController.adminPanel);
router.get('/admin/fire-fighters', adminController.editFireFighters);

router.get('/fire-fighters', fireFighterController.fireFighters);

router.get('/pictures', pictureController.pictures);

module.exports = router;
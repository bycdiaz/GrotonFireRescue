const express = require('express');
const router = express.Router();

const routeController = require('../controllers/routeController.js');
const fireFighterController = require('../controllers/fireFighterController.js');
const pictureController = require('../controllers/pictureController');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

router.get('/', routeController.home);

// Admin 
router.get('/admin', adminController.loginForm);
router.post('/admin', authController.login);
router.get('/admin/add', adminController.addAdminForm);

router.post('/admin/add', 
  adminController.registerNewAdmin
);

router.get('/admin/admin-panel', authController.isLoggedIn, adminController.adminPanel);
router.get('/admin/fire-fighters', authController.isLoggedIn, adminController.editFireFighters);

// User pages
router.get('/fire-fighters', fireFighterController.fireFighters);

router.get('/pictures', pictureController.pictures);

module.exports = router;
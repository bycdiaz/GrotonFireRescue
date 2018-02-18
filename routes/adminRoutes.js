const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

router.get('/', adminController.loginForm);
router.post('/', authController.login);
router.get('/add', adminController.addAdminForm); // TODO: Set so only superAdmin can add admins
router.post('/add', adminController.registerNewAdmin); 
router.get('/logout', authController.logout)

// Panel Items
router.get('/admin-panel', authController.isLoggedIn, adminController.adminPanel);

router.get('/fire-fighters', authController.isLoggedIn, adminController.editFirefighters);
router.post('/fire-fighters', authController.isLoggedIn, adminController.modifyFirefighters);

router.get('/about', authController.isLoggedIn, adminController.editAbout);
router.post('/about', authController.isLoggedIn, adminController.postAbout);

module.exports = router;
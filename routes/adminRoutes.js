const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

router.get('/', adminController.loginForm);
router.post('/', authController.login);
router.get('/add', adminController.addAdminForm);

router.post('/add', 
  adminController.registerNewAdmin
);

router.get('/logout', authController.logout)

router.get('/admin-panel', authController.isLoggedIn, adminController.adminPanel);
router.get('/fire-fighters', authController.isLoggedIn, adminController.editFireFighters);

module.exports = router;
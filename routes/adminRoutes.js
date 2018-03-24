const express = require('express');

const router = express.Router();
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

router.get('/', adminController.loginForm);
router.post('/', authController.login);
router.get('/add', adminController.addAdminForm); // TODO: Set so only superAdmin can add admins
router.post('/add', authController.register);
router.get('/logout', authController.logout);
router.get('/panel', adminController.adminPanel);
router.get('/password-reset', authController.resetPasswordPage);
router.post('/password-reset', authController.resetPassword);
module.exports = router;

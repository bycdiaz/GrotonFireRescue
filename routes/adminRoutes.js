const express = require('express');

const router = express.Router();
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

router.get('/', adminController.loginForm);
router.post('/', authController.login);
router.get('/password-reset', authController.resetPasswordPage);
router.post('/password-reset', authController.resetPassword);
router.get('/logout', authController.logout);

router.use(authController.isLoggedIn);
router.get('/panel', adminController.adminPanel);
router.get('/reset-my-password', authController.selfResetPasswordForm);
router.post('/reset-my-password', authController.selfResetPassword);

router.use(authController.isLoggedIn, authController.isSuperAdmin);
router.get('/add', adminController.addAdminForm); // TODO: Set so only superAdmin can add admins
router.post('/add', authController.register);
router.post('/:id/remove', authController.removeAdmin);
router.post('/:id/resetPassword', authController.forceResetPassword);
// router.post('/:id/setSuperAdmin', authController.setSuperAdmin); // TODO - maybe
module.exports = router;

const express = require('express');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

const homeController = require('../controllers/homeController.js');
const authController = require('../controllers/authController');

router.get('/', homeController.home);

router.get('/edit', authController.isLoggedIn, homeController.editHome);
router.post('/', authController.isLoggedIn, homeController.updateHome);
router.post('/uploadImages', authController.isLoggedIn, upload.array('images'), homeController.uploadImages);

module.exports = router;

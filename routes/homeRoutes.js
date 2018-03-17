const express = require('express');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

const homeController = require('../controllers/homeController.js');

router.get('/', homeController.home);
router.get('/edit', homeController.editHome);
router.post('/', homeController.updateHome);
router.post('/uploadImages', upload.array('images'), homeController.uploadImages);

module.exports = router;

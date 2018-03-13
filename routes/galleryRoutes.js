const express = require('express');

const router = express.Router();

const galleryController = require('../controllers/galleryController');
const galleria = require('../handlers/gallery');

const gallery = galleria();

router.get('/', gallery.getIndex, galleryController.index);
router.get('/:category', gallery.getImagesFromCategory, galleryController.category);


module.exports = router;

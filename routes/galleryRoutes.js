const express = require('express');

const router = express.Router();

const galleryController = require('../controllers/galleryController');
const galleria = require('../handlers/gallery');

const gallery = galleria();

router.get('/', gallery.getIndex({ middleware: true }), galleryController.index);
router.get('/edit', galleryController.editGallery);
router.get('/edit/categorylist', gallery.getIndex({ middleware: false }));

router.get('/:category', gallery.getImagesFromCategory, galleryController.category);


module.exports = router;

const express = require('express');

const router = express.Router();

const galleryController = require('../controllers/galleryController');
const galleria = require('../handlers/gallery');

const gallery = galleria();

router.get('/', gallery.getIndex(), galleryController.index);

router.get('/edit', galleryController.editGallery);
router.get('/edit/categorylist', gallery.getIndex({ json: true }));
router.get('/edit/:category', gallery.getImagesFromCategory({ json: true }));

router.get('/:category', gallery.getImagesFromCategory(), galleryController.category);
router.post('/:cateogry', gallery.upload());


module.exports = router;

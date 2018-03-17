const express = require('express');

const router = express.Router();

const galleryController = require('../controllers/galleryController');
const galleria = require('../handlers/gallery');

const gallery = galleria();

router.get('/', gallery.getIndex(), galleryController.index);

router.get('/admin', galleryController.editGallery);
router.get('/admin/categorylist', gallery.getIndex({ ajax: true }));
router.get('/admin/:category', gallery.getImagesFromCategory({ ajax: true }));

router.get('/:category', gallery.getImagesFromCategory(), galleryController.category);
router.post('/:cateogry', gallery.upload({ ajax: true }));
router.post('/:category/delete', gallery.removeCategory({ ajax: true }));
router.post('/:category/:image/delete', gallery.removeImage({ ajax: true }));


module.exports = router;

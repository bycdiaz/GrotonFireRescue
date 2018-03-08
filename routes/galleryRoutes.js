const express = require('express');

const router = express.Router();

const galleryController = require('../controllers/galleryController');

// TODO - all below

router.get('/', galleryController.showGallery); // Shows Categories with thumbnail
router.get('/:category', galleryController.showGallery); // Shows images from the category
router.get('/:category/:imageName');

router.get('/admin'); // Two panes, one for uploading, one for deleting
router.post('/:category/:image'); // Finds directory and creates it if it doesn't exist, adds image to category
router.post('/admin/delete/:category'); // Deletes entire Category
router.post('/admin/delete/:category/:imageName');// Deletes one image


module.exports = router;

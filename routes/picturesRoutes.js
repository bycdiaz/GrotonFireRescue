const express = require('express');

const router = express.Router();

const pictureController = require('../controllers/pictureController');

// TODO - all below

router.get('/', pictureController.getCategories, pictureController.showPictures); // Shows Categories with thumbnail
router.get('/:category', pictureController.getImages, pictureController.showPictures); // Shows images from the category
router.get('/:category/:image', pictureController.getSingleImage);

router.get('/admin', pictureController.edit); // Two panes, one for uploading, one for deleting
router.post('/:category/:image', pictureController.addImage); // Finds directory and creates it if it doesn't exist, adds image to category
router.post('/admin/delete/:category', pictureController.deleteCategory); // Deletes entire Category
router.post('/admin/delete/:category/:imageName', pictureController.deleteImage);// Deletes one image


module.exports = router;

const express = require('express'); // TODO - make model

const router = express.Router();

const gunDrawingController = require('../controllers/gunDrawingController');
const authController = require('../controllers/authController');

router.get('/', gunDrawingController.index);


router.use(authController.isLoggedIn);
router.get('/add', gunDrawingController.addWinner);
router.post('/add', gunDrawingController.createWinner);
router.post('/:id/delete', gunDrawingController.deleteWinner);
router.get('/:id/edit', gunDrawingController.editWinner);
router.post('/:id/edit', gunDrawingController.updateWinner);

module.exports = router;

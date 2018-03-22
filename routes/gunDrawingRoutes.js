const express = require('express'); // TODO - make model

const router = express.Router();

const gunDrawingController = require('../controllers/gunDrawingController');

router.get('/', gunDrawingController.index);

router.get('/add', gunDrawingController.addWinner);
router.post('/add', gunDrawingController.createWinner);
// router.post('/:id/delete', gunDrawingController.deleteWinner);
// router.post('/:id/edit', gunDrawingController.editWinner);

module.exports = router;

const Router = require('express');
const router = Router();

const imageController = require('../controllers/image.controllers.js');

router.post('/imagenes/:tabla',imageController.upload, imageController.uploadFile);

module.exports = router;
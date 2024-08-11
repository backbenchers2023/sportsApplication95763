const express = require('express');
const router = express.Router();
const matchRoutes = require('../API/Match Management/POST/NewMatch');
const Picupload = require('../API/AssetsAPI/AssetsAPI');
const multer = require('multer');
const logger = require('../log')

const upload = multer({ storage: multer.memoryStorage() });

//Route 
try {
    router.post('/match', matchRoutes);
    router.post('/uploadPic', upload.array('Logo', 2), Picupload);
} catch (error) {
    logger.error(error);
}



module.exports = router;
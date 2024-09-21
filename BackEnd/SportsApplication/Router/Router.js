const express = require('express');
const router = express.Router();
const matchRoutes = require('../API/Match Management/POST/NewMatch');
const SaveScore = require('../API/LiveScore/UpdateScore/UpdateScore')
const Picupload = require('../API/AssetsAPI/AssetsAPI');
const GetUsermatch = require('../API/FetchMatch/FetchMatch');
const GetMatch = require('../API/FetchMatch/GetMatch')
const multer = require('multer');
const logger = require('../log')

const upload = multer({ storage: multer.memoryStorage() });

//Route 
try {
    router.post('/match', matchRoutes);
    router.post('/uploadPic', upload.array('Logo', 2), Picupload);
    router.post('/SaveScore', SaveScore);
    router.get("/GetUsermatch", GetUsermatch);
    router.get('/Getmatch',GetMatch)
} catch (error) {
    logger.error(error);
}



module.exports = router;
const express = require('express');
const router = express.Router();
const matchRoutes = require('../API/Match/POST/NewMatch');
const SaveScore = require('../API/LiveScore/UpdateScore/UpdateScore')
const Picupload = require('../API/AssetsAPI/AssetsAPI');
const GetUsermatch = require('../API/Match/GET/FetchMatch');
const GetMatch = require('../API/Match/GET/GetMatch')
const filestore = require('../API/AssetsAPI/Filestore')
const multer = require('multer');
const logger = require('../log')
const addNewTounament = require('../API/Tournament/POST/NewTournament')
const upload = multer({ storage: multer.memoryStorage() });

//Route 
try {
    //Post 
    router.post('/match', matchRoutes);
    router.post('/uploadPic', upload.array('Logo', 2), Picupload);
    router.post('/SaveScore', SaveScore);
    router.post('/addNewTournament',addNewTounament)
    router.post('/filestore', upload.array('image'), filestore);

    //Get 
    router.get("/GetUsermatch", GetUsermatch);
    router.get('/Getmatch',GetMatch)
} catch (error) {
    logger.error(error);
}



module.exports = router;
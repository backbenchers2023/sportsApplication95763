const express = require('express');
const router = express.Router();
const matchRoutes = require('../API/Match/POST/NewMatch');
const SaveScore = require('../API/LiveScore/UpdateScore/UpdateScore')
const Picupload = require('../API/AssetsAPI/AssetsAPI');
const GetUsermatch = require('../API/Match/GET/FetchUserMatch');
const GetMatch = require('../API/Match/GET/GetAllMatch')
const filestore = require('../API/AssetsAPI/Filestore')
const teams = require('../API/Teams/GET/GetTeams')
const Addteams = require('../API/Teams/POST/AddTeams')
const multer = require('multer');
const logger = require('../log')
const addNewTounament = require('../API/Tournament/POST/NewTournament')
const login = require('../API/login/Login')
const signup = require('../API/SignUp/SignUp')
const upload = multer({ storage: multer.memoryStorage() });

//Route 
try {
    //Post 
    router.post('/match', matchRoutes);
    router.post('/uploadPic', upload.array('Logo', 2), Picupload);
    router.post('/SaveScore', SaveScore);
    router.post('/addNewTournament', addNewTounament);
    router.post('/filestore', upload.array('image'), filestore);
    router.post('/Addteams', Addteams);
    router.post('/signup',signup);
    router.post('/login',login);
    //Get 
    router.get("/GetUsermatch", GetUsermatch);
    router.get('/Getmatch', GetMatch);
    router.get('/GetTeams', teams);
} catch (error) {
    logger.error(error);
}



module.exports = router;
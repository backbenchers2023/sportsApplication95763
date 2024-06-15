const express = require('express');
const bodyParser = require('body-parser');
const matchRoutes = require('./API/Match Management/POST/NewMatch')

const app = express()
const port = 3000;

app.use(bodyParser.json());

//Roting 
app.use('/match', matchRoutes);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
const express = require('express');
const bodyParser = require('body-parser');
const matchRoutes = require('./API/Match Management/POST/NewMatch')
const startWebSocket = require('./API/LiveScore/Commentry/Commentry');
const http = require('http');

const app = express()
const port = 3000;

app.use(bodyParser.json());

//Roting 
app.use('/match', matchRoutes);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

//Websocket
const server = http.createServer(app);
server.listen(3050, () => {
    console.log(`Server is running on port 3050`);
    startWebSocket(server); // Start WebSocket on the same server
});

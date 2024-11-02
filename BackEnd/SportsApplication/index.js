const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const livecommentry = require('./API/LiveScore/Commentry/Commentry');
const livescore = require('./API/LiveScore/UpdateScore/updateScoreWebsocket');
const http = require('http');
const router = require('./Router/Router');
const logger = require('./log')
const app = express();
const port = process.env.PORT || 3000; 

// Use CORS middleware
app.use(cors());

app.use(bodyParser.json());

// Routing
app.use('/App', router);

// Create HTTP server
const server = http.createServer(app);

try {

    // WebSocket
    server.listen(3050, '0.0.0.0', () => {
        console.log("Server is running on port 3050");
        logger.message("Server is running on port 3050");
        livecommentry(server); // Start WebSocket on the same server
        livescore(server);
    });
} catch (error) {
    logger.error(error)
}

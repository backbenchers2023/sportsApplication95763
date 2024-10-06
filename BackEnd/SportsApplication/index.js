const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const startWebSocket = require('./API/LiveScore/Commentry/Commentry');
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
    server.listen(port, '0.0.0.0', () => {
        console.log(`Server is running on port ${port}`);
        logger.message(`Websocket Server is running on port ${port}`);
        startWebSocket(server); // Start WebSocket on the same server
    });

    // Listen for HTTP requests
    app.listen(port, '0.0.0.0', () => {
        logger.message(`Server is running on port ${port}`);
        console.log(`Server is running on port ${port}`);
    });
} catch (error) {
    logger.error(error)
}

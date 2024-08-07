const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const matchRoutes = require('./API/Match Management/POST/NewMatch');
const startWebSocket = require('./API/LiveScore/Commentry/Commentry');
const http = require('http');

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

app.use(bodyParser.json());

// Routing
app.use('/match', matchRoutes);

// Create HTTP server
const server = http.createServer(app);

// WebSocket
server.listen(3050, '0.0.0.0', () => {
    console.log(`Server is running on port 3050`);
    startWebSocket(server); // Start WebSocket on the same server
});

// Listen for HTTP requests
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});

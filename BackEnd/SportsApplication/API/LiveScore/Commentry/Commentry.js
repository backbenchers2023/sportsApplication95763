const Socket = require('ws');
const commentry = require('./Commentry_msg');
const logger = require('../../../log');

function startWebSocket(server) {
    const wss = new Socket.Server({ server });

    wss.on('connection', (ws) => {
        try {
             logger.message('Client connected');

            ws.on('message', (message) => {
                try {
                    // Parse the incoming message
                    const parsedMessage = JSON.parse(message);
                    const event = parsedMessage.event.toLowerCase();
                    const teamName = parsedMessage.teamName || '';
                    const playerName = parsedMessage.playerName || '';

                    const eventResponses = commentry.responses[event];

                    if (eventResponses) {
                        const random = Math.floor(Math.random() * eventResponses.length);
                        let response = eventResponses[random];

                        // Replace placeholders with actual names if present
                        response = response.replace(/\[TEAM\]/g, teamName);
                        response = response.replace(/\[PLAYER\]/g, playerName);

                        ws.send(response);
                    } else {
                        ws.send('Unknown Event');
                    }
                } catch (err) {
                    logger.error(`Error processing message: ${err.message}`);
                    ws.send('Error processing your request');
                }
            });

            ws.on('close', () => {
                 logger.message('Client disconnected');
            });
        } catch (err) {
            logger.error(err);
        }
    });

     logger.message('WebSocket server is running on ws://localhost:3000/commentry/websocket');
}

module.exports = startWebSocket;

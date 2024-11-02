const Socket = require('ws');
const logger = require('../../../log');

function livescore(server) {
    try {
        const wss = new Socket.Server({ server, path: '/sendscore' });

        wss.on('connection', (ws) => {
            try {
                logger.message('Client connected');

                ws.on('message', (message) => {
                    try {
                        ws.send(message.toString());
                    } catch (err) {
                        logger.error(`Error processing message: ${err.message}`);
                        console.log(err);

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
    }
    catch (e) {
        logger.message('WebSocket server is running on ws://localhost:3050/commentry/websocket');
        console.log(e);

    }

}

module.exports = livescore;

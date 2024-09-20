const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// Create an Express application
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve the static files (for example, your webpage with WebRTC)
app.use(express.static('public'));

wss.on('connection', (ws) => {
    console.log('A new client connected');

    // When receiving a message from a client
    ws.on('message', (message) => {
        console.log('Received message:', message);

        // Broadcast the message to all other clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

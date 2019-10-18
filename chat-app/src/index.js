const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const path = require('path');
const app = express();
// setup for server to support web sockets

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

// let count = 0;
let eventData = 'welcome to server!'

const server = app.listen(port, () => {
    console.log(`chat app listening on port ${port}!`)
});

const io = socketio(server);
io.on('connection', (socket) => {
    console.log('new websocket connection');
    socket.emit('welcomeMessage', eventData);
    // socket.emit('countUpdated', count);

    // socket.on('incremented', () => {
    //     count++;
    //     io.emit('countUpdated', count)
    //     // emits event to all connections
    // });
    socket.on('clientMessage', (message) => {
        io.emit('showMessage', message);
    });
});

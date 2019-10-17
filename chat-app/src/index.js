const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const path = require('path');
const app = express();
// setup for server to support web sockets

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

const server = app.listen(port, () => {
    console.log(`chat app listening on port ${port}!`)
});

const io = socketio(server);
io.on('connection', () => {
    console.log('new websocket connection');
});
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');

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
io.on('connection', (socket) => {
    console.log('new websocket connection');

    socket.emit('showMessage', 'welcome to the server!');
    socket.broadcast.emit('showMessage', 'a new user has joined the server');

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('no bad language allowed');
        };

        io.emit('showMessage', message);
        callback('delivered');
    });

    socket.on('shareLocation', (position, callback) => {
        socket.broadcast.emit('locationShared', `https://google.com/maps?q=${position.lat},${position.long}`);
        callback();
    });

    socket.on('disconnect', () => {
        io.emit('showMessage', 'a user has left the server')
    });
});

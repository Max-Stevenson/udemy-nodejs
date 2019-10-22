const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersByRoom } = require('./utils/users');

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

    socket.on('join', ({ username, room }, callback) => {
        const {error, user} = addUser({
            id: socket.id,
            username,
            room
        });

        if (error) {
            return callback(error);
        }

        socket.join(user.room);
        socket.emit('showMessage', generateMessage('Welcome to server!'));
        socket.broadcast.to(user.room).emit('showMessage', generateMessage(`${user.username} has joined!`));
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('no bad language allowed');
        };

        io.to(user.room).emit('showMessage', generateMessage(message));
        callback('delivered');
    });

    socket.on('shareLocation', (position, callback) => {
        const user = getUser(socket.id);
        socket.broadcast.to(user.room).emit('locationShared', generateLocationMessage(`https://google.com/maps?q=${position.lat},${position.long}`));
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('showMessage', generateMessage(`${user.username} left ${user.room}.`));
        };
    });
});

const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const path = require('path');
const router = express.Router();
const app = express();
const server = http.createServer(app);

const io = socketio(server);
// setup for server to support web sockets

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

router.get('/', (req,res) => {
    res.sendFile(publicDirectoryPath + '/index.html');
});

io.on('connection', () => {
    console.log('new websocket connection');
});

app.use('/', router);
server.listen(port, () => {
    console.log(`chat app listening on port ${port}!`)
});
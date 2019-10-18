const socket = io();

socket.on('message', (eventData) => {
    console.log(eventData); 
});

const chatForm = document.getElementsByClassName('chatForm')[0];
const messageInput = document.getElementById('messageBox');

chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = event.target.elements.message.value;
    socket.emit('clientMessage', message, (error) => {
        if (error) {
            return console.log(error);
        };
        console.log('message delivered');
    });
});

socket.on('showMessage', (message) => {
    console.log(message);
});

document.querySelector('#locationButton').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('shareLocation', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        });
    });
});
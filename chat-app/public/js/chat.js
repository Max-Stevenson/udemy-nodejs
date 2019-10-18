const socket = io();

socket.on('welcomeMessage', (eventData) => {
    console.log(eventData); 
});

const chatForm = document.getElementsByClassName('chatForm')[0];
const messageInput = document.getElementById('messageBox');

chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = event.target.elements.message.value;
    socket.emit('clientMessage', message);
});

socket.on('showMessage', (message) => {
    console.log(message);  
});
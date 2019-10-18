const socket = io();

// socket.on('countUpdated', (count) => {
//     console.log('count updated ' + count); 
// });

// const buttonOne = document.querySelector('#buttonOne');

// buttonOne.addEventListener('click', () => {
//     socket.emit('incremented');
// });

socket.on('welcomeMessage', (eventData) => {
    console.log(eventData); 
});

const chatForm = document.getElementsByClassName('chatForm')[0];
const messageInput = document.getElementById('messageBox');

chatForm.addEventListener('submit', () => {
    event.preventDefault();
    const message = messageInput.value;
    socket.emit('clientMessage', message);
});

socket.on('showMessage', (message) => {
    console.log(message);  
});
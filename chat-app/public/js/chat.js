const socket = io();

socket.on('countUpdated', (count) => {
    console.log('count updated ' + count); 
});

const buttonOne = document.querySelector('#buttonOne');

buttonOne.addEventListener('click', () => {
    socket.emit('incremented');
});
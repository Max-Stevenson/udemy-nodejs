const socket = io();
const $messageForm = document.querySelector('#chatForm');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $shareLocationButton = document.querySelector('#locationButton');
const $messages = document.querySelector('#messages');

const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;


socket.on('showMessage', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        message: message.messageText,
        createdAt: moment(message.createdAt).format('H:mm')
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationShared', (url) => {
    console.log(url);
    const html = Mustache.render(locationTemplate, {
        url: url,
        createdAt: moment(url.createdAt).format('H:mm')
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

$messageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    $messageFormButton.setAttribute('disabled', 'disabled');

    const message = event.target.elements.message.value;
    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();
        if (error) {
            return console.log(error);
        };
        console.log('message delivered');
    });
});

$shareLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }
    $shareLocationButton.setAttribute('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('shareLocation', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        }, () => {
            console.log('location shared');
            $shareLocationButton.removeAttribute('disabled');
        });
    });
});
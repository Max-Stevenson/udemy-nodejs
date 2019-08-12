console.log("Client side js file is loaded");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const forecastParagraph = document.querySelector('#forecast');
const errorParagraph = document.querySelector('#errorMessage');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    errorParagraph.textContent = '';
    forecastParagraph.textContent= 'Loading...';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                forecastParagraph.textContent = '';
                errorParagraph.textContent = data.error;
            } else {
                forecastParagraph.textContent = data.location + ". " + data.forecast;
                
            };
        });
    });
});
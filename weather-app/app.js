const request = require('request');
const geocode = require('./utils/geocode');

// const url = 'https://api.darksky.net/forecast/42416b702d51ba9bd0a7e3ba4ad48966/51.4838,-0.6041';

// request({url: url, json: true}, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to the weather service');  
//     } else if (response.body.error) {
//         console.log('Unable to find location');
//     } else {
//         let temp = response.body.currently.temperature;
//         let precip = response.body.currently.precipProbability;
//         console.log('It is currently ' + temp + ' degrees out. There is a ' + precip + '% chance of rain.');
//     }
// });

geocode('Madison', (error, data) => {
    console.log("error", error);
    console.log("data", data);
});
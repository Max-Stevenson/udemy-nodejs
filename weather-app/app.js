const request = require('request');

const url = 'https://api.darksky.net/forecast/42416b702d51ba9bd0a7e3ba4ad48966/51.4838,-0.6041';

request({url: url, json: true}, (error, response) => {
    if (error) {
        console.log('Unable to connect to the weather service');  
    } else if (response.body.error) {
        console.log('Unable to find location');
    } else {
        let temp = response.body.currently.temperature;
        let precip = response.body.currently.precipProbability;
        console.log('It is currently ' + temp + ' degrees out. There is a ' + precip + '% chance of rain.');
    }
});

const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/London.json?access_token=pk.eyJ1IjoibXMwMTAxIiwiYSI6ImNqeXd2YTFrcjB5bjczY255MjdpZHlubjUifQ.-ayGzSbp_WtTMr0VB-21JA&limit=1'

request({uri: geoUrl, json: true}, (error, response) => {
    if (error) {
        console.log('Unable to connect to the geolocation service');  
    } else if (response.body.features.length === 0) {
        console.log('Unable to find geo location');
    } else {
        console.log(response.body.features[0].center);
    }
});
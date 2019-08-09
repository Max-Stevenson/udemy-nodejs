const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/42416b702d51ba9bd0a7e3ba4ad48966/'+ lat + ',' + long;
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to the weather service');
        } else if (response.body.error) {
            callback('Unable to find location');
        } else {
            const summary = response.body.currently.summary;
            const temp = response.body.currently.temperature;
            const precip = response.body.currently.precipProbability;
            callback(undefined, {
                timezone: response.body.timezone,
                forecast: 'It is currently ' + summary + ' and ' + temp + ' degrees out. There is a ' + precip + '% chance of rain.'
            });
        };
    });
};

module.exports = forecast;
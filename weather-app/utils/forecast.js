const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/42416b702d51ba9bd0a7e3ba4ad48966/'+ lat + ',' + long;
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to the weather service');
        } else if (response.body.error) {
            callback('Unable to find location');
        } else {
            callback(undefined, {
                temp: response.body.currently.temperature,
                precip: response.body.currently.precipProbability,
                timezone: response.body.timezone
            });
        };
    });
};

module.exports = forecast;
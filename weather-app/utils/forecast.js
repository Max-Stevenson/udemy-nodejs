const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/42416b702d51ba9bd0a7e3ba4ad48966/'+ lat + ',' + long;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the weather service');
        } else if (body.error) {
            callback('Unable to find location');
        } else {
            const summary = body.currently.summary;
            const temp = body.currently.temperature;
            const precip = body.currently.precipProbability;
            callback(undefined, {
                timezone: body.timezone,
                forecast: 'It is currently ' + summary + ' and ' + temp + ' degrees out. There is a ' + precip + '% chance of rain.'
            });
        };
    });
};

module.exports = forecast;
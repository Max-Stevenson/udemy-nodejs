const request = require('request');

const DARK_SKY_API = process.env.DARK_SKY_API;
const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/'+ DARK_SKY_API +'/'+ lat + ',' + long;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback({
                error: 'Unable to connect to Dark Sky API.'
            });
        } else if (body.error) {
            callback({
                error: 'Unable to get forecast data for location.'
            });
        } else {
            const summary = body.currently.summary;
            const temp = body.currently.temperature;
            const precip = body.currently.precipProbability;
            const hourlySummary = body.hourly.summary;
            callback(undefined, {
                timezone: body.timezone,
                forecast: 'It is currently ' + summary + ' and ' + temp + ' degrees out. There is a ' + precip + '% chance of rain.',
                futureHour: 'Forecast for the day: ' + hourlySummary
            });
        };
    });
};

module.exports = forecast;
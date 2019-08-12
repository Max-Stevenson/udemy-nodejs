const request = require('request');

const MAPBOX_API = process.env.MAPBOX_API;
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=' + MAPBOX_API;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback({
                error: 'Unable to connect to Mapbox API.'
            });
        } else if (body.features.length === 0) {
            callback({
                error: 'Unable to find location. Try another search.'
            });
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            });
        };
    });
};

module.exports = geocode;
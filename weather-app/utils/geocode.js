const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibXMwMTAxIiwiYSI6ImNqeXd2YTFrcjB5bjczY255MjdpZHlubjUifQ.-ayGzSbp_WtTMr0VB-21JA&limit=1';
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to location services!');
        } else if (body.features.length === 0) {
            callback('unable to find geolocation, try another search!');
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
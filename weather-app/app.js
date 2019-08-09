const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

if (process.argv[2] != undefined) {
    const inputLocation = process.argv[2];
    geocode(inputLocation, (error, {lat, long, location}) => {
        if (error) {
            return console.log(error);
        };
        forecast(lat, long, (error, {forecast}) => {
            if (error) {
                return console.log(error);
            };
            console.log(location);
            console.log(forecast);
          });
    });
} else {
    return console.log('You must enter a location to search');
};
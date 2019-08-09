const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

if (process.argv[2] != undefined) {
    const inputLocation = process.argv[2];
    geocode(inputLocation, (error, data) => {
        if (error) {
            return console.log(error);
        };
        forecast(data.lat, data.long, (error, forecastData) => {
            if (error) {
                return console.log(error);
            };
            console.log(data.location);
            console.log(forecastData.forecast);
          });
    });
} else {
    return console.log('You must enter a location to search');
};
require('dotenv').config();
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static views
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Max Stevenson'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Hope this helps...',
        name: 'Max'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    } else {
        geocode(req.query.address, (error, {lat, long, location} = {}) => {
            if (error) {
                return res.send(error);
            };
            forecast(lat, long, (error, {forecast, futureHour}) => {
                if (error) {
                    return res.send(error);
                };
                res.send({
                    location: location,
                    forecast: forecast,
                    futureHour: futureHour
                });
            });
        });
    };
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page not found',
        message: 'No one can help you now'
    });
});

// Must be last as looks through routes in order
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        message: 'This is not where you want to be'
    });
});

 app.listen(port, () => {
     console.log('Server running on port ' + port);
 });
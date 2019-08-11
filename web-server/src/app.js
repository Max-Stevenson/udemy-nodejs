const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

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
    };
    const lookupLocation = req.query.address;
    res.send({
        location: lookupLocation,
    });
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

 app.listen(3000, () => {
     console.log('Server running on port 3000');
 });
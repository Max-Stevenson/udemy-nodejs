const path = require('path');
const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs');

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
        message: 'Hope this helps...'
    });
});

app.get('/weather', (req, res) => {
    res.send({
        location: 'Madison, WI',
        forecast: 'sunny'
    });
});

 app.listen(3000, () => {
     console.log('Server running on port 3000');
 });
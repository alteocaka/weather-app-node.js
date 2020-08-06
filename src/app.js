const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

console.log(path.join(__dirname, '../public'));

// Define paths for Express config:
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Initializing Express:
const app = express();

const port = process.env.PORT || 3000

// Setup handlebars and views location:
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve:
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Hello there, this is the main page...'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'This is the about section...'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App',
        name: 'Help Section'
    });
});

app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error: 'You must provide a value for address!'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error:error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error: error});
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        })
    })
});

app.get('/products', (req, res) => {
    // The req object gives us access to the query params
    // of an url.

    if(!req.query.search){
        return res.send({
            error: 'You must provide a value for search!'
        });
    }

    console.log(req.query.search);
    res.send({
       products:[]
    });
});

app.get('/help/*', (req, res) => {
    res.render('404',{
        title1: 'Help article not found!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title2: '404 Error!'
    })
});

app.listen(port, () => {
    console.log('Server is running on port ' + 3000 + '.');
});
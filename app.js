// main js script for server app

"use strict";

// define modules
const express = require('express');


// create app variable
const app = express();

// create config variable
const config = require('./config');

// set up port 
const port = process.env.PORT || config.port;

// set up routes
const home = require('./routes/home');
const webhook = require('./routes/webhook');

// set body parser
const bodyParser = require('body-parser');

// set boyd parser, view engine and stylesheet
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public/stylesheets'));

// set url routing 
app.use('/', home);
app.use('/webhook', webhook);

let server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log('Press Ctrl+C to stop server');
});
server.setTimeout(500000);
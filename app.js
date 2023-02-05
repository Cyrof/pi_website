// main js script for server app

"use strict";

// define modules
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');


// create app variable
const app = express();

// create config variable
const config = require('./config');

// set up port 
const port = process.env.PORT || config.port;

// set up routes
const home = require('./routes/home');
const webhook = require('./routes/webhook');
const sys_info = require('./routes/system_information');
const users = require('./routes/users');

// set body parser
const bodyParser = require('body-parser');

// set boyd parser, view engine and stylesheet
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public/stylesheets'));
app.use(express.static(__dirname + '/public/static'));
app.use(cookieParser());

// import dotenv to setup database
require('dotenv').config();
const db = require('./db/database');
const mongoString = process.env.DATABASE_URL;
db(mongoString);

// config session
const TWO_HOURS = 1000 * 60 * 60 * 2;
app.use(session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    name: 'session',
    cookie: {
        maxAge: TWO_HOURS
    },
    resave: false,
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        dbName: 'Home-server',
        collectionName: 'sessions',
        ttl: TWO_HOURS,
        autoRemove: 'native'
    })
}));

// set url routing 
app.use('/', users);
app.use('/home', home);
app.use('/webhook', webhook);
app.use('/sys-info', sys_info);

let server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log('Press Ctrl+C to stop server');
});
server.setTimeout(500000);
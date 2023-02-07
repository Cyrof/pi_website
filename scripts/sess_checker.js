// script to check for session 

const express = require('express');
const router = express.Router();

let sessionChecker = (req, res, next) => {
    if (req.session.token){
        console.log('User session found');
        next();
    } else {
        console.log('No user session found');
        res.redirect('/');
    }
};

module.exports = sessionChecker

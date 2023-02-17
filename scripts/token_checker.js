// script to check for token for reset password

const express = require('express');
const router = express.Router();
const User = require('../models/database_model');
const mongoose = require('mongoose');

// checking token in db
let dbTokenChecker = async (token) => {
    let user = await User.find({token: token});
    if (user.length > 0){
        return true;
    } else {
        return false;
    }
}


let tokenChecker = async (req, res, next) => {
    // check token in url
    if (req.query.token){
        // check token in db
        if (await dbTokenChecker(req.query.token)){
            console.log("Token found in url & database");
            next();
        } else{
            res.render('../views/error', {tokenErrorBool: true, tokenError: "Token Does Not Exists."});
        }
    } else {
        console.log("No token in url found");
        res.redirect('/');
    }
}

module.exports = tokenChecker
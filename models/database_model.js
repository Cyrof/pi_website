// function to create database model 

const mongoose = require('mongoose');

const dataschema = new mongoose.Schema({
    fname: {
        required: true,
        type: String
    },
    lname: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    uname: {
        required: true,
        type: String
    },
    pwd: {
        required: true,
        type: String
    },
    token: {
        required: true,
        type: String
    },
    access: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('User', dataschema);
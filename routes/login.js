// script to link login.ejs to app

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/database_model');
const session = require('express-session');

let sess;
router.get('/', (req, res) => {
    res.render('../views/login', {valid: false, error: ""});
});

router.post('/', async (req, res) => {
    sess = req.session;
    // get body from req
    const body = req.body;
    // find user from database
    let user = await User.find({$or: [{email: body.uname}, {uname: body.uname}]});
    user = user[0]
    let error = {
        invalidPs : 'Incorrect password',
        userNotFound : 'User not found',
        accessDenied : 'Account access denied'
    };
    if (user){
        // check if password with hashed password stored in the database
        const validps = await bcrypt.compare(body.pwd, user.pwd);
        const access = user.access
        if (validps && access === 'approved'){
            sess.userid = user.uname;
            sess.save();
            console.log(sess)
            res.render('../views/login', {valid : true});
        } else if(access === "denied"){
            res.render('../views/login', {valid: false, error: error.accessDenied});
        } else {
            res.render('../views/login', {valid : false, error : error.invalidPs});
        }
    } else {
        res.render('../views/login', {valid : false, error : error.userNotFound});
    }
});

module.exports = router;
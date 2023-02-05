// scripts linking login, signup, logout and forget password route for app 

const express = require('express');
const router = express.Router();
const User = require('../models/database_model');
const bcrypt = require('bcrypt');
const session = require('express-session');


// login route
let sess;
router.get('/', (req, res) => {
    res.render('../views/login', { valid: false, error: "" });
})

router.post('/', async (req, res) => {
    sess = req.session;
    // get body from req
    const body = req.body;
    // find user from database
    let user = await User.find({ $or: [{ email: body.uname }, { uname: body.uname }] });
    user = user[0]
    let error = {
        invalidPs: 'Incorrect password',
        userNotFound: 'User not found',
        accessDenied: 'Account access denied'
    };
    if (user) {
        // check if password with hashed password stored in the database
        const validps = await bcrypt.compare(body.pwd, user.pwd);
        const access = user.access
        if (validps && access === 'approved') {
            sess.userid = user.uname;
            sess.save();
            console.log(sess)
            res.render('../views/login', { valid: true });
        } else if (access === "denied") {
            res.render('../views/login', { valid: false, error: error.accessDenied });
        } else {
            res.render('../views/login', { valid: false, error: error.invalidPs });
        }
    } else {
        res.render('../views/login', { valid: false, error: error.userNotFound });
    }
});

// signup route
router.get('/sign-up', (req, res) => {
    res.render('../views/sign_up', {confirm: false, error: ""});
});

router.post('/sign-up', async (req, res) => {
    const body = req.body;
    let checkEmail = await User.find({email:body.email})
    let checkuname = await User.find({uname:body.uname})
    if (!checkEmail.length && !checkuname.length) {
        res.render('../views/sign_up', {confirm : true, error: ""});
        body.access = "denied";
        // create mongoose instance for new user
        const user = new User(body);
        // gen salt than hash password
        const salt = await bcrypt.genSalt(10);
        user.pwd = await bcrypt.hash(user.pwd, salt);
        user.save();
    } else if(checkEmail.length){
        console.log('hi')
        res.render('../views/sign_up', {confirm : false, error: "email"})
    } else if(checkuname.length){
        res.render('../views/sign_up', {confirm:false, error: 'uname'});
    }
    
});

// logout route
router.get('/logout', (req, res) => {
    console.log('session destroyed');
    req.session.destroy();
    res.clearCookie('session');
    res.redirect('/');
});

// forget password route
router.get('/forgot-password', (req, res) => {
    res.render('../views/fgt_ps');
})

module.exports = router;
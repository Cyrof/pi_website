// scripts linking login, signup, logout and forget password route for app 

const express = require('express');
const router = express.Router();
const User = require('../models/database_model');
const bcrypt = require('bcrypt');
const session = require('express-session');
const nodeMailer = require('nodemailer');
const randtoken = require('rand-token');
const mongoose = require('mongoose');
const tokenCheck = require('../scripts/token_checker');


// login route
let sess;
router.get('/', async (req, res) => {
    if (req.session.token){
        let user = await User.find({token:req.session.token});
        if (user.length > 0){
            res.redirect('/home')
        }
    }   
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
            sess.token = user.token;
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
    res.render('../views/sign_up', { confirm: false, error: "" });
});

router.post('/sign-up', async (req, res) => {
    const body = req.body;
    let checkEmail = await User.find({ email: body.email })
    let checkuname = await User.find({ uname: body.uname })
    if (!checkEmail.length && !checkuname.length) {
        res.render('../views/sign_up', { confirm: true, error: "" });
        let token = randtoken.generate(20);
        body.token = token;
        body.access = "denied";
        // create mongoose instance for new user
        const user = new User(body);
        // gen salt than hash password
        const salt = await bcrypt.genSalt(10);
        user.pwd = await bcrypt.hash(user.pwd, salt);
        user.save();
    } else if (checkEmail.length) {
        console.log('hi')
        res.render('../views/sign_up', { confirm: false, error: "email" })
    } else if (checkuname.length) {
        res.render('../views/sign_up', { confirm: false, error: 'uname' });
    }

});

// logout route
router.get('/logout', (req, res) => {
    console.log('session destroyed');
    req.session.destroy();
    res.clearCookie('session');
    res.redirect('/');
});

// function to send email to user
function sendEmail(email, token) {
    let Email = email;
    let Token = token;

    let mail = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hs.auto.noreply@gmail.com',
            pass: 'hvloxoqohcyktdao'
        }
    });

    let mailOptions = {
        from: 'hs.auto.noreply@gmail.com',
        to: Email,
        subject: 'Reset Password link',
        // for testing purposes
        // html: '<h1>You requested to reset your password, kindly use this <a href="http://localhost:8080/reset-password?token='+Token+'">link</a> to reset your password</h1>'

        // for deployment
        html: '<h1>You requested to reset your password, kindly use this <a href="http://25e4-116-87-173-227.ap.ngrok.io/reset-password?token='+Token+'">link</a> to reset your password</h1>'
    };

    mail.sendMail(mailOptions, function (error, info){
        if (error) {
            console.log(1);
        } else {
            console.log(0);
        }
    });
}

// forget password route
router.get('/forgot-password', (req, res) => {
    res.render('../views/fgt_ps', {type: '', msg: ''});
});

router.post('/reset-ps-link', async (req, res) => {
    let email = req.body.email;
    let user = await User.find({email: email});
    let db = mongoose.connection.collection('users');
    user = user[0];
    let type = '';
    let msg = '';

    if (user && !user.length){
        let token = randtoken.generate(20);
        let send = sendEmail(email, token);
        if (send != '0'){
            let data = { $set: {token: token}}
            db.updateOne({email: email}, data, function (err, res){
                if (err) throw err;
            })
            type = 'success'
            msg = 'Reset email link sent successfully';
        } else {
            type = 'error';
            msg = 'An error has occurred';
        }
    } else {
        type = "error";
        msg = "The email is not registered with us."
    }

    // req.flash(type, msg);
    // res.redirect('/forgot-password');
    res.render('../views/fgt_ps', {type: type, msg: msg})
});

// reset password link route
router.get('/reset-password', tokenCheck, (req, res) =>{
    console.log(req.query.token);
    res.render('../views/reset-password', {success: false,token: req.query.token});
});

router.post('/update-password', async (req, res) =>{
    let body = req.body;
    let user = await User.find({token: body.token});
    let db = mongoose.connection.collection('users');
    user = user[0];
    let token = randtoken.generate(20);
    let salt = await bcrypt.genSalt(10);
    let pwd = await bcrypt.hash(body.pwd2, salt);

    let data = {$set: {pwd: pwd, token: token}};
    db.update({token:body.token}, data, function(err, res){
        if (err) throw err;
    });

    console.log(body);
    // res.redirect('/reset-password?token=' + body.token);
    res.render('../views/reset-password', {success:true, token: body.token});
});


module.exports = router;
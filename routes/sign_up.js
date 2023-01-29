// script to link sign_up.ejs to app 

const express = require('express');
const router = express.Router();
const User = require('../models/database_model');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('../views/sign_up', {confirm : false, error: ""});
});

router.post('/', async (req, res) => {
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

module.exports = router;
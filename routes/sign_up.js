// script to link sign_up.ejs to app 

const express = require('express');
const router = express.Router();
const User = require('../models/database_model');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('../views/sign_up');
});

router.post('/', async (req, res) => {
    res.render('../views/sign_up');
    const body = req.body;
    body.access = "denied";
    // create mongoose instance for new user
    const user = new User(body);
    // gen salt than hash password
    const salt = await bcrypt.genSalt(10);
    user.pwd = await bcrypt.hash(user.pwd, salt);
    user.save();
});

module.exports = router;
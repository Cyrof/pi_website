// script to link home.ejs to server

const express = require('express');
const router = express.Router();
const checker = require('../scripts/sess_checker');
const User = require('../models/database_model');

router.get('/', checker, async (req, res) => {
    const token = req.session.token;
    let user = await User.find({token:token});
    user = user[0]
    console.log(user.uname);
    res.render('../views/home', {page: 'Overview', user: user.uname});
});

module.exports = router;

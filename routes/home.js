// script to link home.ejs to server

const express = require('express');
const router = express.Router();
const checker = require('../scripts/sess_checker');

router.get('/', checker,(req, res) => {
    console.log(req.session.id);
    res.render('../views/home');
});

module.exports = router;

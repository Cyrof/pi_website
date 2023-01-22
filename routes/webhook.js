// script to take in webhook data

const express = require('express');
const router = express.Router();
const wol = require('../scripts/wol');

router.get('/', (req, res) => {
    req.setTimeout(500000);
    res.sendStatus(200);
    res.redirect('/');
});

router.post('/', (req, res) => {
    req.setTimeout(500000);
    const data = req.body;
    console.log(data);
    if (data.command == "turn on pc"){
        console.log('hi')
        wol.start();
    }
    res.redirect('/');
});

module.exports = router;
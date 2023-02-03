// script to take in webhook data

const express = require('express');
const router = express.Router();
const wol = require('../scripts/wol');
const git_pull = require('../scripts/auto_pull');

router.get('/', (req, res) => {
    req.setTimeout(500000);
    res.redirect('/');
});

router.post('/', (req, res) => {
    req.setTimeout(500000);
    const data = req.body;
    console.log(data);
    console.log('hi')
    if (data.command === "turn on pc"){
        wol.start();
    } else if (data.repository.name === "pi_website"){
        git_pull.pull();
    }
    res.redirect('/');
});

module.exports = router;
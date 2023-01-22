// script to take in webhook data

const express = require('express');
const router = express.Router();

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
        require('../scripts/wol');
    }
    res.redirect('/');
});

module.exports = router;
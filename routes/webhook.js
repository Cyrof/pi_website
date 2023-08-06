// script to take in webhook data

const express = require('express');
const router = express.Router();
const wol = require('../scripts/wol');
const git_pull = require('../scripts/auto_pull');
const save_grafana = require('../scripts/save_grafana');

router.get('/', (req, res) => {
    req.setTimeout(500000);
    res.redirect('/');
});

router.post('/', (req, res) => {
    req.setTimeout(500000);
    const data = req.body;
    console.log(data);
    if (data.command === "turn on pc"){
        wol.start();
    } else if (data.repository.name === "pi_website"){
        git_pull.pull();
        git_pull.npmUpdate();
    }
    res.redirect('/');
});

// router.post('/grafana-data', async (req, res) => {
//     // console.log(req.body)
//     await save_grafana(data=req.body)
//     res.send(req.body)
// });

module.exports = router;
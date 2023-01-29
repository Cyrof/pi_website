// script to link system_info.ejs to application

const express = require('express');
const router = express.Router();
const checker = require('../scripts/sess_checker')


router.get('/', checker, async (req, res) => {
    // res.render('../views/login', {valid: false, error: ""});
    let data = require('../scripts/system_info');
    // data = await data.systemInfo();
    // console.log(data);
    data.systemInfo().then(d => {
        res.render('../views/system_info', {sys_info: d});
    });
    // res.render('../views/system_info', {sys_info: data});
})

module.exports = router;
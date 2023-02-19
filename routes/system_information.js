// script to link system_info.ejs to application

const express = require('express');
const router = express.Router();
const checker = require('../scripts/sess_checker')
const User = require('../models/database_model');


router.get('/', checker, async (req, res) => {
    let data = await require('../scripts/system_info').systemInfo();
    let token = req.session.token;
    let user = await User.find({token: token});
    user = user[0]
    // data.systemInfo().then(d => {
    //     res.render('../views/system_info', {sys_info: d});
    // });
    res.render('../views/system_info', {sys_info: data, page: 'System Information', user: user.uname})
})

module.exports = router;
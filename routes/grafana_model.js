// script to link grafana model to app

const express = require('express');
const router = express.Router();
const checker = require('../scripts/sess_checker');
const User = require('../models/database_model');


// router.use('/', checker, grafanaProxy)
// router.use('/grafana-chart', grafanaProxy)

router.get('/', checker, async (req, res) => {
    let token = req.session.token;
    let user = await User.find({token: token});
    user = user[0]
    // let url = 'http://192.168.6.31:30000'

    res.redirect('http://116.87.173.227:30000')
    // res.render('../views/grafana.ejs', {user: user.uname, page: 'Grafana Charts', 'url': url});
    // res.send('hi')
})

module.exports = router;
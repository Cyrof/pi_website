// script to link system_info.ejs to application

const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    // res.render('../views/login', {valid: false, error: ""});
    let data = require('../scripts/system_info');
    // data = await data.systemInfo();
    console.log(data);
    await res.render('../views/system_info', {sys_info: data});
})

module.exports = router;
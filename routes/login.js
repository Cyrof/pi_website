// script to link login.ejs to app

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('../views/login');
});

module.exports = router;
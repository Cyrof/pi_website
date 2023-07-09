// script to link page_down.ejs to server

const express = require('express');
const router = express.Router();
const checker = require('../scripts/sess_checker');

router.get('/', checker, (req, res) => {
    res.render('../views/page_down');
});

module.exports = router;
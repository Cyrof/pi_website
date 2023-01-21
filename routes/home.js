// script to link home.ejs to server

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('../views/home');
});

module.exports = router;

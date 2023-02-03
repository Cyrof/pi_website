// script to logout and destroy the session

const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    console.log('session destroyed');
    req.session.destroy();
    res.clearCookie('session')
    res.redirect('/');
});

module.exports = router;
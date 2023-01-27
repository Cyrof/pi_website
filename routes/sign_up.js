// script to link sign_up.ejs to app 

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('../views/sign_up');
});

module.exports = router;
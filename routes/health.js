// script to check health of server

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Health check passed');
});

module.exports = router;
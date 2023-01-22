// script to send wake on lan to desktop

const wol = require('wakeonlan')

wol('B4:2E:99:A3:F2:D2').then(() => {
    console.log('wol sent!');
});

module.exports = wol;
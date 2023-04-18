// app.js with ngrok incorporation
const nodemon = require('nodemon');
const ngrok = require('ngrok');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8080;
const auth_token = process.env.AUTH;
const update_url = require('./scripts/url_update');

// ==================================== //
// config nodemon 
nodemon({
    script: 'app.js',
    ext: 'js'
});

let url = null

nodemon.on('start', async () => {
    if (!url) {
        url = await ngrok.connect({
            authtoken: auth_token,
            port: port,
            region: 'ap',
        });
        update_url(url);
        console.log(`Server now available at ${url}`);
    };
}).on('restart', () => {
    console.log(`Server restarted at ${url}`);
}).on('quit', async () => {
    await ngrok.kill();
});
// .on('quit', async () => {
    // await ngrok.kill();
// })
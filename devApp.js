// app.js with ngrok incorporation
const nodemon = require('nodemon');
const ngrok = require('ngrok');
const dotenv = require('dotenv');
// dotenv.config();
// try{
//     var port_env = process.env.PORT;
//     var auth_token = process.env.AUTH;
// } catch(err) {
//     dotenv.config()
//     port_env = process.env.PORT;
//     auth_token = process.env.AUTH;
// }

dotenv.config()

var env_var = {}
Object.entries(process.env).forEach(([key, val]) => {
    // 
    if (key.startsWith('AUTH')) {
        env_var.auth_token = val
    } else if (key.startsWith('PORT')) {
        env_var.port_env = val
    }
})
console.log(env_var)
console.log("at devApp.js")
const port = env_var.port_env || 8080;

// ==================================== //
// config nodemon 
nodemon({
    script: 'app.js',
    ext: 'js'
});

let url = null

// set functions to activate based on the status of nodemon 

nodemon.on('start', async () => {
    try {
        if (!url) {
            url = await ngrok.connect({
                authtoken: env_var.auth_token,
                port: port,
                // region: 'ap',
            });
            // IMPORTANT 
            // Make sure there is GIT_BRANCH env variable before running
            // For more information visit https://github.com/Cyrof/pi_website/tree/master

            // turn off for development to reduce cluttering git commits
            // update_url(url);
            console.log(`Server now available at ${url}`);
        };
    }catch (err){
        console.log(err)
        console.log("Ngrok error has occurred")
        console.log("url=" + url)
    }
}).on('restart', () => {
        console.log(`Server restarted at ${url}`);
    }).on('quit', async () => {
        await ngrok.kill();
    });
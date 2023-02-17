// script to auto pull changes from github using webhook

const { exec } = require('child_process');

pull = function () {

    // run auto pull from github
    exec('git pull --ff-only origin master', (err, stdout, stderr) => {
        if (err) {
            console.error(`error: ${err.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

    // do npm install to auto install packages after pull from github
    exec('npm install', (err, stdout, stderr) => {
        if (err) {
            console.error(`error: ${err.message}`);
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
    });
}

module.exports.pull = pull;
// script to auto pull changes from github using webhook

const spawn = require('child_process');

const pull = spawn('git pull origin master', (err, stdout, stderr) => {
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

module.exports = pull;
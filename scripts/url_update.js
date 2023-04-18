// script to read and write dynamic url into readme file 
// include fs for file read/write
const fs = require('fs');
// include simple-git to be able to use git commands in node
const simpleGit = require('simple-git');
const git = simpleGit.default();
// include dotenv to be able to access .env file 
const dotenv = require('dotenv');
dotenv.config();

// global variables
const path = "./README.md";

// ========================================= //
// function to push updated readme file to github 

async function pushReadme() {
    var branch = process.env.GIT_BRANCH
    await git.checkout(branch)
    await git.add(path);
    console.log("README.md staged...")
    await git.commit('Update readme');
    console.log("Committed changes...")
    await git.push('origin');
    console.log("Pushed to github...")
}

// ========================================= //
// function to get content of the readme file and update the url

var update_url = function(url) {
    fs.readFile(path, function(err, data){
        if (err) throw err;

        var content = data.toString().split('\n')

        content.forEach((line, i) => {
            if (line.includes("URL")){
                var new_url = content[i].split(' ');
                new_url.pop()
                new_url.push(url)
                new_url = new_url.join(" ");
                content[i] = new_url;
            }
        });

        content = content.join("\n");
        var f = fs.openSync(path, 'w');
        var bufferedText = new Buffer(content);
        fs.writeSync(f, bufferedText);
    });
    pushReadme();
}

module.exports = update_url;
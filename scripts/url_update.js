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
const branch = process.env.GIT_BRANCH

// ========================================= //
// function to push updated readme file to github 

async function pushReadme() {
    await git.addConfig('user.name', process.env.GIT_NAME, append=true, scope="global")
    await git.addConfig('user.email', process.env.GIT_EMAIL, append=true, scope="global")
    await git.addRemote('user', `https://${process.env.GIT_UNAME}:${process.env.GIT_PAT}@github.com/${process.env.GIT_UNAME}/pi_website.git`)
    await git.checkout(branch)
    await git.add(path);
    console.log("README.md staged...")
    await git.commit('Update readme');
    console.log("Committed changes...")
    await git.push('user', branch);
    console.log("Pushed to github...")
}

// ========================================= //
// function to get content of the readme file and update the url

var update_url = async function(url) {
    await git.pull('origin', branch)
    console.log("Pull from github...")
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
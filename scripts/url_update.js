// script to read and write dynamic url into readme file 
// include fs for file read/write
const fs = require('fs');
// include simple-git to be able to use git commands in node
const simpleGit = require('simple-git');
const git = simpleGit.default();
// include dotenv to be able to access .env file 
const dotenv = require('dotenv');
// dotenv.config();

// global variables
const path = "./README.md";
// try{
//     var branch = process.env.GIT_BRANCH
//     var git_name = process.env.GIT_NAME
//     var git_email = process.env.GIT_EMAIL
//     var git_uname = process.env.GIT_UNAME
//     var git_pat = process.env.GIT_PAT
// } catch (err){
//     dotenv.config()
//     branch = process.env.GIT_BRANCH
//     git_name = process.env.GIT_NAME
//     git_email = process.env.GIT_EMAIL
//     git_uname = process.env.GIT_UNAME
//     git_pat = process.env.GIT_PAT
// }


dotenv.config()

var env_var = {}
Object.entries(process.env).forEach(([key, val]) => {
    // 
    if (key.startsWith('GIT_BRANCH')) {
        env_var.branch = val
    } else if (key.startsWith('GIT_NAME')) {
        env_var.git_name = val
    } else if (key.startsWith('GIT_EMAIL')) {
        env_var.git_email = val
    } else if (key.startsWith('GIT_UNAME')) {
        env_var.git_uname = val
    } else if (key.startsWith('GIT_PAT')) {
        env_var.git_pat = val
    }
})
console.log(env_var)
console.log("at url_update.js")



// ========================================= //
// function to push updated readme file to github 

async function pushReadme() {
    // try and catch to to catch err // test
    try {
        await git.addConfig('user.name', env_var.git_name, append = true, scope = "global")
        await git.addConfig('user.email', env_var.git_email, append = true, scope = "global")
        try {
            await git.addRemote('user', `https://${env_var.git_pat}@github.com/${env_var.git_uname}/pi_website.git`)
        } catch (err) {
            console.log(err);
        }
        await git.checkout(env_var.branch)
        await git.add(path);
        console.log("README.md staged...")
        await git.commit('Update readme');
        console.log("Committed changes...")
        await git.push('user', env_var.branch);
        console.log("Pushed to github...")
    } catch (err) {
        console.error(err);
        process.exit(0);
    }
}

// ========================================= //
// function to get content of the readme file and update the url

var update_url = async function (url) {
    try {
        await git.addConfig('user.name', env_var.git_name, append = true, scope = "global")
        await git.addConfig('user.email', env_var.git_email, append = true, scope = "global")
        await git.addRemote('user', `https://${env_var.git_uname}:${env_var.git_pat}@github.com/${env_var.git_uname}/pi_website.git`)
    } catch (err) {addRemote
        console.log(err);
    }
    try {
        git.getRemotes().then(remote => {
            console.log(remote)
        })
        await git.pull('user', env_var.branch)
        console.log("Pull from github...")
        fs.readFile(path, function (err, data) {
            if (err) throw err;

            var content = data.toString().split('\n')

            content.forEach((line, i) => {
                if (line.includes("URL")) {
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
    catch(err){
        console.log(err);
        console.error("An error occurred while pulling from github")
    }
}

module.exports = update_url;
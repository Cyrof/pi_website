// script to link shared folder page to server

const express = require('express');
const router = express.Router();
const checker = require('../scripts/sess_checker');
const User = require('../models/database_model');
const fs = require('fs');
const zip = require('express-easy-zip');

// function readfile(path){
//     data = fs.readFileSync(path, {encoding: 'utf8'})
//     return data
// }

// function to check if file exists
function checkFile(fileName, data) {
    for (key in data) {
        if (data[key]['name'] === fileName) {
            return key
        } else if (data[key]['name'] !== fileName) {
            continue
        } else {
            return false
        }
    }
}

// functoin to read file and return data
function readFile(path) {
    data = fs.readFileSync(path, { encoding: 'utf8' })
    return data
}

// shared folder route
router.get('/', checker, async (req, res) => {

    const token = req.session.token;
    let user = await User.find({ token: token });
    user = user[0];
    if (Object.entries(req.query).length !== 0) {
        if (req.query.dir) {
            data = require('../scripts/folderContent').getContentDetails(p = req.query.dir);
            FileIndex = checkFile(req.query.path, data);
        } else {
            data = require('../scripts/folderContent').getContentDetails();
            FileIndex = checkFile(req.query.path, data);
        }


        if (FileIndex && data[FileIndex]['type'] === 'directory') {
            if (req.query.dir) {
                path = req.query.dir + `/${req.query.path}`;
            } else {
                path = process.env.SHARED_FOLDER_PATH + `/${data[FileIndex]['name']}`;
            }
            try {
                d = require('../scripts/folderContent').getContentDetails(p = path);
                res.render('../views/sharedFolder', { page: 'Shared Folder', user: user.uname, content: d, dir: path });
            }
            catch (e) {
                res.send("An error occured" + e)
            }

        } else {
            let p = process.env.SHARED_FOLDER_PATH + `/${data[FileIndex]['name']}`
            if (req.query.dir) {
                let path = req.query.dir + `/${req.query.path}`;
                d = readFile(path = path);
            } else {
                d = readFile(path = p);
            }

            res.send(d);
        }
    } else {
        let data = require('../scripts/folderContent').getContentDetails();
        res.render('../views/sharedFolder', { page: 'Shared Folder', user: user.uname, content: data, dir: false });
    }

});

// download route
router.get('/download', (req, res) => {
    if (req.query.dir) {
        path = req.query.dir + `/${req.query.path}`;
        data = require('../scripts/folderContent').getContentDetails(req.query.dir)
    } else {
        path = process.env.SHARED_FOLDER_PATH + `/${req.query.path}`;
        data = require('../scripts/folderContent').getContentDetails()
    }
    let i = checkFile(req.query.path, data);
    if (i && data[i]['type'] === 'directory') {
        fName = data[i]['name'];
        data = require('../scripts/folderContent').getContentDetails(process.env.SHARED_FOLDER_PATH + `/${req.query.path}`);
        let array_data = [];
        for (const key in data){
            if (data[key]['type'] === 'directory'){
                var d = {path: path+`/${data[key]['name']}/`, name: data[key]['name']}
            } else {
                var d = {path: path+`/${data[key]['name']}`, name: data[key]['name']}
            }
            array_data.push(d);
            console.log(array_data)
            res.zip({files: array_data, filename:fName});
        }
    } else {
        console.log(path);
        res.download(path);
    }

    // res.redirect('/sharedFolder');
})

module.exports = router;
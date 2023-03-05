// script to link shared folder page to server

const express = require('express');
const router = express.Router();
const checker = require('../scripts/sess_checker');
const User = require('../models/database_model');
const fs = require('fs')

function readfile(path){
    data = fs.readFileSync(path, {encoding: 'utf8'})
    return data
}

router.get('/', checker, async (req, res) => {
    const folderContent = require('../scripts/folderContent').getContentDetails();
    // console.log(folderContent)
    const token = req.session.token;
    let user = await User.find({ token: token });
    user = user[0];

    if (Object.entries(req.query).length !== 0){
        let folderContent = require('../scripts/folderContent').getContentDetails();
        if (req.query.dir){
            let path = process.env.SHARED_FOLDER_PATH;
            path += `/${req.query.dir}`
            folderContent = require('../scripts/folderContent').getContentDetails(p=path);
        }
        // console.log(query)
        if (folderContent[String(req.query['loc'])]['type'] === 'directory'){
            let path = process.env.SHARED_FOLDER_PATH;
            let name = folderContent[String(req.query['loc'])]['name'];
            path = path + `/${name}`;
            console.log(path)
            let newFolderContent = require('../scripts/folderContent').getContentDetails(p=path);
            res.render('../views/sharedFolder', { page: 'Shared Folder', user: user.uname, content: newFolderContent, query: name});
        } else {
            let path = process.env.SHARED_FOLDER_PATH;
            path = path + `/${folderContent[String(req.query['loc'])]['name']}`;
            data = readfile(path)
            res.send(data)
        }
        
    } else {
        let folderContent = require('../scripts/folderContent').getContentDetails();
        res.render('../views/sharedFolder', { page: 'Shared Folder', user: user.uname, content: folderContent, query: false});
    }

    
});

module.exports = router;
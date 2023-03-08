// script to get content of shared folder

const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

// join path of the directory 
// const directoryPath = path.join('/home/cyrof/', 'sharedStuff');
const directoryPath = process.env.SHARED_FOLDER_PATH

function getContentDetails(p=directoryPath){
    let details = {}
    // let newdetails = {}
    console.log(p)
    let files = fs.readdirSync(p)
    let objNum = 1
    files.forEach((element) => {
        stats = fs.statSync(path.join(p, element));
        let id = Buffer.from(element, 'utf-8').toString('hex');
        let check_path_directory = stats.isDirectory() ? true : false;
        // let type = mime.lookup(element) !== false ? mime.lookup(element) : 'directory';
        let type = check_path_directory ? 'directory' : mime.lookup(element);
        type = type === false ? 'unknown' : type;
        let size = stats.size;
        let modified = stats.mtime;
        let f = {name: element, type: type, size: size, modified: modified};
        details[objNum] = f;
        objNum += 1;
    });
    return details
}

// console.log(getContentDetails());
module.exports.getContentDetails = getContentDetails;


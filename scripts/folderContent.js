// script to get content of shared folder

const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

// join path of the directory 
// const directoryPath = path.join('/home/cyrof/', 'sharedStuff');
const directoryPath = "/home/cyrof/sharedStuff"

let getContentDetails = () => {
    let details = {}
    // let newdetails = {}
    files = fs.readdirSync(directoryPath)
    files.forEach((element) => {
        stats = fs.statSync(path.join(directoryPath, element));
        let id = Buffer.from(element, 'utf-8').toString('hex');
        let type = mime.lookup(element) !== false ? mime.lookup(element) : 'directory';
        let size = stats.size;
        let modified = stats.mtime;
        let f = {id:id, name: element, type: type, size: size, modified: modified};
        details[element] = f;
    });
    return details
}

// console.log(getContentDetails());
module.exports.getContentDetails = getContentDetails;


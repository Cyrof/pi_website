// script to read and write dynamic url into readme file 
// include fs for file read/write
const fs = require('fs');

// global variables
const path = "./README.md";

// ========================================= //
// functoin to read the read me file and get pos to write url to 

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
}

module.exports = update_url;
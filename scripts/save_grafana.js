// file to save grafana data from post req

const fs = require('fs')

const save_data = async (data=null) => {
    data = JSON.stringify(data) 

    fs.writeFileSync('grafana-model.json', data, function(err){
        if (err){
            console.log(err);
        }
    });
}

module.exports = save_data;
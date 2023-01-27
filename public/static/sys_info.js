// reload page every 5 sec
setTimeout(function(){
    window.location.reload(1);
}, 2000);

const { head } = require("../../routes/system_information");


// const childbar = document.querySelector(".child-bar");
// const cpu_percent = document.getElementById("cpu-percent");
// console.log(cpu_percent);
// childbar.style.width = `${cpu_percent.innerText}%`;
// childbar.innerText = `${cpu_percent.innerText}`;

function updatechild(percentage, type){
    console.log('hi');
    console.log(percentage);
    const childbar = document.querySelector(`.${type}-bar`);
    childbar.style.width = `${percentage}%`;
}

// function to set header date
function setDate(){
    const head_date = document.getElementById('header-date');
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    today = `${dd}/${mm}/${yyyy}:${time}`;
    head_date.innerText = `${today}`;
}

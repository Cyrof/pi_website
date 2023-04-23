// reload page every 5 sec
setTimeout(function () {
    window.location.reload(1);
}, 2000);


function updatechild(percentage, type) {
    const childbar = document.querySelector(`.${type}-bar`);
    childbar.style.width = `${percentage}%`;
}

// function to set header date
function setDate() {
    const head_date = document.getElementById('header-date');
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    today = `${dd}/${mm}/${yyyy}:${time}`;
    head_date.innerText = `${today}`;
}

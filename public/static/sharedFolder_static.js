// onchange function for file input 
$('#drag-drop').change(function (event) {
    handleFiles(event.target.files);
});


// js for drag and drop file upload
let dropArea = document.getElementById('upload-content');

// prevent default drag behaviors
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
    document.body.addEventListener(eventName, preventDefaults, false)
});

dropArea.addEventListener('drop', handleDrop, false);

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

function handleDrop(e) {
    var dt = e.dataTransfer
    var files = dt.files
    $("#drag-drop").get(0).files = files
    handleFiles(files)
}

function handleFiles(files) {
    var files = [...files]
    // console.log(files)
    files.forEach(previewFile)
}

function previewFile(file) {
    $('.show-files').append(`<p id='file'>${file.name}</p>`)
}

// ========================================================= //
// js for modals
let modal = $('.model-container');
let btn = $('#upload-model-btn');
let close_btn = $('.close');

// make btn open model content
btn.click(function () {
    // console.log('hi')
    modal.show();
});
// make close btn close model content
close_btn.click(function () {
    modal.hide();
});
// make it so user click outside of box to close
window.onclick = function () {
    if ($(event.target).is(modal)) {
        modal.hide()
    }
}

// ========================================================= //
// js for custom right click
const contextMenu = document.querySelector('.contextMenu');
const scope = $('.folder');

scope.on("contextmenu", (event) => {
    event.preventDefault();

    const { clientX: mouseX, clientY: mouseY } = event;

    const {normalisedX, normalisedY} = normalisePos(mouseX, mouseY);

    contextMenu.style.top = `${normalisedY}px`;
    contextMenu.style.left = `${normalisedX}px`;

    contextMenu.classList.remove('visible');

    setTimeout(() => {
        contextMenu.classList.add('visible');
    });

    // ====================================================== //
    // dynamically make context menu clickable
    // make right click open file or folder 
    open(event.target)

    
});

$(document).on('click', (event) => {
    if (event.target.offsetParent != contextMenu){
        contextMenu.classList.remove('visible');
    }
})

const normalisePos = (mouseX, mouseY) => {
    // compute what is the mouse position relative to the container element (scope)
    const {
        left: scopeOffsetX,
        top: scopeOffsetY,
    } = scope[0].getBoundingClientRect();

    const scopeX = mouseX - scopeOffsetX;
    const scopeY = mouseY - scopeOffsetY;

    // check if the element will go out of bounds 
    const outOfBoundsOnX = scopeX + contextMenu.clientWidth > scope[0].clientWidth;
    const outOfBoundsOnY = scopeY + contextMenu.clientHeight > scope[0].clientHeight;

    let normalisedX = mouseX;
    let normalisedY = mouseY;

    // normalise on X
    if (outOfBoundsOnX){
        normalisedX = scopeOffsetX + scope[0].clientWidth - contextMenu.clientWidth;
    }

    //normalise on Y
    if (outOfBoundsOnY){
        normalisedY = scopeOffsetY + scope[0].clientHeight - contextMenu.clientHeight;
    }

    return {normalisedX, normalisedY};
};

const open = (elem) => {
    const opn = $('opn')
    var tag = elem.tagName
    if (tag === 'A'){
        var path = elem.getAttribute('href').split('?')
        var url = window.location.href + `?${path[1]}`
        console.log(url)
        console.log(path)
    }

    opn.click(function(){
        window.location.assign(url)
        console.log('open clicked')
    })
}
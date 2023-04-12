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
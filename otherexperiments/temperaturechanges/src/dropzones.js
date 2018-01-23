var state = {
    isHclDropzone: true,
    isNaohDropzone: false,
};

var measureTemperatureTimeoutID;

function setState(newState) {
    Object.assign(state, newState);
    if(state.isHclDropzone)
        document.getElementById('hclDropzone').classList.add('hcl_dropzone');
    else
        document.getElementById('hclDropzone').classList.remove('hcl_dropzone');
    
    if(state.isNaohDropzone)
        document.getElementById('naohDropzone').classList.add('naoh_dropzone');
    else
        document.getElementById('naohDropzone').classList.remove('naoh_dropzone');
}

export default { state, setState };
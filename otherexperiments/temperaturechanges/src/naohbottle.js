var state = {
    draggable: true,
    inDropzone: false,
};

var dropzoneFillTimerID;

function setState(newState) {
    Object.assign(state, newState);
    if(state.draggable)
        document.getElementById('naohContainer').classList.add('naoh_draggable');
    else
        document.getElementById('naohContainer').classList.remove('naoh_draggable');
    
    if (state.inDropzone)
        document.getElementById('naohContainer').dataset.inDropzone = 'true';
    else
        document.getElementById('naohContainer').dataset.inDropzone = 'false';
}

export default { state, setState };

var state = {
    draggable: true,
    inDropzone: false,
};

var dropzoneFillTimerID;

function setState(newState) {
    Object.assign(state, newState);
    if(state.draggable)
        document.getElementById('hclContainer').classList.add('hcl_draggable');
    else
        document.getElementById('hclContainer').classList.remove('hcl_draggable');
    
    if (state.inDropzone)
        document.getElementById('hclContainer').dataset.inDropzone = 'true';
    else
        document.getElementById('hclContainer').dataset.inDropzone = 'false';
}

export default { state, setState };

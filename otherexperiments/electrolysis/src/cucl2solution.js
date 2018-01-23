var state = {
    draggable: true,
    inDropzone: false,
    draggableInteraction: null,
};

var dropzoneFillTimerID;

function setState(newState) {
    Object.assign(state, newState);
    if(state.draggable)
        document.getElementById('cuCl2Container').classList.add('cuCl2_draggable');
    else
        document.getElementById('cuCl2Container').classList.remove('cuCl2_draggable');
        
    if (state.inDropzone)
        document.getElementById('cuCl2Container').dataset.inDropzone = 'true';
    else
        document.getElementById('cuCl2Container').dataset.inDropzone = 'false';
}

export default { state, setState };

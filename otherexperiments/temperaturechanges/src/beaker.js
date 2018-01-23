var state = {
    draggable: false,
    dropzoneDraggable: null,
};

function setState(newState) {
    Object.assign(state, newState);
    if(state.draggable)
        document.getElementById('beakerContainer').classList.add('beaker_draggable');
    else
        document.getElementById('beakerContainer').classList.remove('beaker_draggable');
}

export default { state, setState };

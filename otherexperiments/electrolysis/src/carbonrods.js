var state = {
    draggable: false,
    inPosition: false,
};

function setState(newState) {
    Object.assign(state, newState);
    if(state.draggable) {
        document.getElementById('carbonRod1Container').classList.add('carbonRod_draggable');
        document.getElementById('carbonRod2Container').classList.add('carbonRod_draggable');
    } else {
        document.getElementById('carbonRod1Container').classList.remove('carbonRod_draggable');
        document.getElementById('carbonRod2Container').classList.remove('carbonRod_draggable');
    }
}

export default { state, setState };
var state = {
    draggable: false,
};

function setState(newState) {
    Object.assign(state, newState);
    if(state.draggable)
        document.getElementById('tweezerLitmusContainer').classList.add('tweezers_draggable');
    else    
        document.getElementById('tweezerLitmusContainer').classList.remove('tweezers_draggable');
}

export default { state, setState };
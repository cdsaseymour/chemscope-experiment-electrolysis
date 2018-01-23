var state = {
    draggable: true,
    volume: 0,
    labelVisible: true,
    labelContent: "Volume: <span id=\"volumeHighlight\">0cm³</span>",
};

function setState(newState) {
    Object.assign(state, newState);
    if(state.draggable)
        document.getElementById('beakerContainer').classList.add('beaker_draggable');
    else
        document.getElementById('beakerContainer').classList.remove('beaker_draggable');
    
    if(state.labelVisible)
        document.getElementById('beakerLabel').classList.remove('noshow')
    else
        document.getElementById('beakerLabel').classList.add('noshow')
    
    document.getElementById('beakerLabel').innerHTML = state.labelContent;
}

export default { state, setState };

var state = {
    draggable: true,
    volume: 0,
    naohVolume: 0,
    inPosition: false,
    isThermometerDropzone: false,
    labelVisible: false,
    dropzoneDraggable: null,
};

function setState(newState) {
    Object.assign(state, newState);
    if(state.draggable)
        document.getElementById('polystyreneCupContainer').classList.add('polystyreneCup_draggable');
    else
        document.getElementById('polystyreneCupContainer').classList.remove('polystyreneCup_draggable');
    
    if(state.isThermometerDropzone)
        document.getElementById('polystyreneCupContainer').classList.add('thermometer_dropzone');
    else
        document.getElementById('polystyreneCupContainer').classList.remove('thermometer_dropzone');
    
    if(state.labelVisible)
        document.getElementById('naohVolumeLabel').classList.remove('noshow');
    else
        document.getElementById('naohVolumeLabel').classList.add('noshow');
    
    document.getElementById('naohVolumeLabel').innerHTML = "NaOH Volume: <span id=\"naohVolume\">" + state.naohVolume + "cm³</span>";
}

export default { state, setState };

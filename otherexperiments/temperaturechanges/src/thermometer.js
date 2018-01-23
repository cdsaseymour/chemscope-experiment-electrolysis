var state = {
    draggable: false,
    celciusMeasured: 21.00,
    labelVisible: false,
    inDropzone: false,
};

var measureTemperatureTimeoutID;

function setState(newState) {
    Object.assign(state, newState);
    if(state.draggable)
        document.getElementById('thermometerContainer').classList.add('thermometer_draggable');
    else
        document.getElementById('thermometerContainer').classList.remove('thermometer_draggable');
    
    if(state.labelVisible)
        document.getElementById('thermometerLabel').classList.remove('noshow');
    else
        document.getElementById('thermometerLabel').classList.add('noshow');
    
    if (state.inDropzone)
        document.getElementById('thermometerContainer').dataset.inDropzone = 'true';
    else
        document.getElementById('thermometerContainer').dataset.inDropzone = 'false';
    
    document.getElementById('thermometerLabel').innerHTML = state.celciusMeasured + "°C";
}

export default { state, setState };
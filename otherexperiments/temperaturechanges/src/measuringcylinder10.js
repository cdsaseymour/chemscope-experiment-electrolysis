import config from './config.js';
var state = {
    draggable: false,
    inDropzone: false,
    volume: 0,
    shouldPour: false,
    dragInteraction: null,
};

function setState(newState) {
    Object.assign(state, newState);
    if(state.draggable)
        document.getElementById('measuringCylinder10Container').classList.add('measuringCylinder10_draggable');
    else {
        document.getElementById('measuringCylinder10Container').classList.remove('measuringCylinder10_draggable');
        if(state.dragInteraction != null)   state.dragInteraction.stop();
    }
    
    if (state.inDropzone)
        document.getElementById('measuringCylinder10Container').dataset.inDropzone = 'true';
    else
        document.getElementById('measuringCylinder10Container').dataset.inDropzone = 'false';
    document.getElementById('measuringCylinder10Container').style.backgroundColor = (state.volume == 0 ? "#00aaff" : "#" + state.volume.toString() + state.volume.toString() + state.volume.toString() + state.volume.toString() + "ff");
    //document.getElementById('measuringCylinder10Img').src = config.measuringCylinder10FillImages[parseInt(state.volume)];
}

export default { state, setState };

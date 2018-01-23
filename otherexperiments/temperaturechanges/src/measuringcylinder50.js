import config from './config.js';
var state = {
    draggable: true,
    inDropzone: false,
    volume: 0,
    shouldPour: false,
    dragInteraction: null,
};

function setState(newState) {
    Object.assign(state, newState);
    if(state.draggable)
        document.getElementById('measuringCylinder50Container').classList.add('measuringCylinder50_draggable');
    else {
        document.getElementById('measuringCylinder50Container').classList.remove('measuringCylinder50_draggable');
        if(state.dragInteraction != null)   state.dragInteraction.stop();
    }
    
    if (state.inDropzone)
        document.getElementById('measuringCylinder50Container').dataset.inDropzone = 'true';
    else
        document.getElementById('measuringCylinder50Container').dataset.inDropzone = 'false';
    var volStage = parseInt(state.volume / 10);
    document.getElementById('measuringCylinder50Container').style.backgroundColor = (state.volume == 0 ? "#0000ff" : "#" + volStage.toString() + volStage.toString() + volStage.toString() + volStage.toString() + volStage.toString() + volStage.toString());
    //document.getElementById('measuringCylinder50Img').src = config.measuringCylinder50FillImages[parseInt(state.volume / 10)];
}

export default { state, setState };

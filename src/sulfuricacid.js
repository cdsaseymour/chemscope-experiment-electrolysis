import resetPosition from './resetposition.js';

var state = {
    draggable: false,
    interaction: null,
    element: null,
    inDropzone: false,
    dropzone: true,
};

var saIntervalID; //IntervalID for use in the Sulfuric Acid dropzone, so that we can clear the "setInterval" command.

function setState(newState) {
    Object.assign(state, newState);

    if (state.draggable) {
        document.getElementById('sulfacidContainer').classList.add('sulfacid_draggable');
    } else {
        document.getElementById('sulfacidContainer').classList.remove('sulfacid_draggable');
        if (state.interaction) {
            state.interaction.stop();
            resetPosition(state.element);
        }
    }

    if (state.inDropzone)
        document.getElementById('sulfacidContainer').dataset.inDropzone = 'true';
    else
        document.getElementById('sulfacidContainer').dataset.inDropzone = 'false';
    
    if(state.dropzone) 
        document.getElementById('sulfacidContainer').classList.add('pipette-sulfacid_dropzone');
    else
        document.getElementById('sulfacidContainer').classList.remove('pipette-sulfacid_dropzone');
}

export default { state, setState };

import resetPosition from './resetposition.js';

var state = {
    draggable: false,
    interaction: null,
    element: null,
    inDropzone: false,
    dropzone: true,
    sulfuricAcidDragDrop: false,
};

//var moIntervalID; //IntervalID for use in the Methyl Orange Indicator dropzone, so that we can clear the "setInterval" command.

function setState(newState) {
    Object.assign(state, newState);

    if (state.draggable) {
        document.getElementById('methylorangeContainer').classList.add('methylorange_draggable');
    } else {
        document
        .getElementById('methylorangeContainer')
        .classList.remove('methylorange_draggable');
        if (state.interaction) {
            state.interaction.stop();
            resetPosition(state.element);
        }
    }

    if (state.inDropzone) {
        document.getElementById('methylorangeContainer').dataset.inDropzone = 'true';
    } else {
        document.getElementById('methylorangeContainer').dataset.inDropzone = 'false';
    }
    
    if(state.dropzone)
        document.getElementById('methylorangeContainer').classList.add('pipette-methylorange_dropzone');
    else
        document.getElementById('methylorangeContainer').classList.remove('pipette-methylorange_dropzone');
    
    if(state.sulfuricAcidDragDrop)
        document.getElementById('methylorangeContainer').classList.add('sulfacid_drag-drop');
    else
        document.getElementById('methylorangeContainer').classList.remove('sulfacid_drag-drop');
}

export default { state, setState };

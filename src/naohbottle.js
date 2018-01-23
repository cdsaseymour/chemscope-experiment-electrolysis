import resetPosition from './resetposition.js';

var state = {
    draggable: false,
    interaction: null,
    element: null,
    dropzone: true,
    sulfuricAcidDragDrop: false,
};

function setState(newState) {
    Object.assign(state, newState);
    
    if (state.draggable)
        document.getElementById('naohContainer').classList.add('naohbottle_draggable');
    else {
        document.getElementById('naohContainer').classList.remove('naohbottle_draggable');
        if (state.interaction) {
            state.interaction.stop();
            resetPosition(state.element);
        }
    }
    
    if (state.dropzone == false) {
        //Remove the NaOH bottle's dropzone class, so that it cannot be used as a dropzone anymore.
        document
            .getElementById('naohContainer')
            .classList.remove('pipette-naoh_dropzone');
    } else {
        //Add the NaOH bottle's dropzone class, so that it cannot be used as a dropzone anymore.
        document.getElementById('naohContainer').classList.add('pipette-naoh_dropzone');
    }
    
    if(state.sulfuricAcidDragDrop)
        document.getElementById('naohContainer').classList.add('sulfacid_drag-drop');
    else
        document.getElementById('naohContainer').classList.remove('sulfacid_drag-drop');
}

export default { state, setState };

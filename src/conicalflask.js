import config from './config.js';
import resetPosition from './resetposition.js';
import methylorange from './methylorange.js';

var state = {
    filledAmount: 0, //Used so we can change the image of the flask depending on the fill stage
    titrationStage: 0,
    inPosition: false,
    drops: 0,
    dropzone: true,
    draggable: true,
    interaction: null,
    element: null,
    visible: true,
    noteVisible: true,
    noteContent: "<span id=\"flaskVolume\">0</span>cm³",
    methylDropzoneVisible: false,
};
function setState(newState) {
    Object.assign(state, newState);
    document.getElementById('flaskNote').innerHTML = state.noteContent;
    if (state.titrationStage == 0) {
        //Update the image of the flask so that it shows the correct flask filled stage.
        document.getElementById('flaskImg').src =
        config.flaskImages[(state.filledAmount/5)];
    } else if (state.titrationStage > 0) {
        //Set the flask image to the correct one that displays the current titration.
        document.getElementById('flaskImg').src =
        config.flaskTitrationImages[state.titrationStage];
    }
    if (state.dropzone) {
        //Remove the flask's dropzone class, so that it cannot be used as a dropzone anymore.
        document.getElementById('flaskContainer').classList.add('pipette-flask_dropzone');
    } else {
        document
        .getElementById('flaskContainer')
        .classList.remove('pipette-flask_dropzone');
    }

    if (state.draggable) {
        document.getElementById('flaskContainer').classList.add('flask_draggable');
    } else {
        document.getElementById('flaskContainer').classList.remove('flask_draggable');
        if (state.interaction) {
            state.interaction.stop();
            resetPosition(state.element);
        }
    }

    if (state.visible) {
        document.getElementById('flaskContainer').classList.remove('noshow');
    } else {
        document.getElementById('flaskContainer').classList.add('noshow');    
    }

    if (state.noteVisible) {
        document.getElementById('flaskNote').classList.remove('noshow');
    } else {
        document.getElementById('flaskNote').classList.add('noshow');
    }
    
    if (state.methylDropzoneVisible) {
        document.getElementById('methylorangeDropzone').classList.remove('noshow');
    } else {
        document.getElementById('methylorangeDropzone').classList.add('noshow');
    }

    if (state.drops >= 5 && state.titrationStage == 0) {
        //Set the flask image to the correct image, showing the methyl orange colour.
        document.getElementById('flaskImg').src = config.flaskTitrationImages[0];
    }
}

export default { state, setState };

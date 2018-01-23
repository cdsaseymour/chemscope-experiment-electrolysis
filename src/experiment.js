import config from './config.js';
import conicalflask from './conicalflask.js';
import burette from './burette.js';
import naohbottle from './naohbottle.js';
import pipette from './pipette.js';
import clamp from './clamp.js';
import clampdropzone from './clampdropzone.js';
import burettetap from './burettetap.js';
import funnel from './funnel.js';
import sulfuricacid from './sulfuricacid.js';
import methylorange from './methylorange.js';
import question from './question.js';
import resetPosition from './resetposition.js';
import warningmessage from './warningmessage.js';
import colourchart from './colourchart.js';
import completemessage from './completemessage.js';
import experimentprocedure from './experimentprocedure.js';

var state = {
    step: 1,
    complete: false,
    marks: 10
};

function setState(newState) {
    Object.assign(state, newState);
    //Simply set the step text to the corresponding text in the experimentSteps array. Also, display the 'stepCompleteBox' for the
    //previous step (the boxes which show underneath the step with the step number and green tick).
    if (state.step <= 7) {
        if(state.step > 1) {
            //Show the step number with tick next to it underneath the curret step.
            document.getElementById('step' + (state.step - 1) + 'CompleteBox').classList.remove('noshow');
        }
        //Show the current step.
        document.getElementById('stepDesc').innerHTML = config.experimentSteps[state.step - 1];
    }
    if (state.complete) {
        document.getElementById('step' + state.step + 'CompleteBox').classList.remove('noshow');
        completemessage.setState({visible: true});
    }
    //Set the step number in the top left of the step box to correctly indicate the current step.
    document.getElementById('stepNo').innerHTML = state.step + ".";
    document.getElementById('helpContent').innerHTML =
    config.helpMessages[state.step - 1];

    if (state.step == 2) {
        naohbottle.setState({ dropzone: false });
        conicalflask.setState({ dropzone: false, draggable: false});
        //Remove the clamp dropzone's "noshow" class, so it can be seen again
        clampdropzone.setState({ visible: true });
        //Stop the event interaction -> this stops the pipette being dragged (if it is being dragged at this moment, it will just stop)
        pipette.setState({ draggable: false});
        //Allow dragging of clamp
        clamp.setState({draggable: true});
    } else if (state.step == 3) {
        //Remove dragging on the burette.
        burette.setState({ draggable: false, zindex: 1});
        //Remove the class 'noshow' on elements that are needed in the next step, so that they are visible.
        burettetap.setState({ visible: true });
    } else if (state.step == 4) {
        //Set the methyl orange and naoh bottle to not be draggable, not be  registered by the sulfuric acid dropzone and reset their positions.
        methylorange.setState({draggable: false, sulfuricAcidDragDrop: false});
        naohbottle.setState({draggable: false, sulfuricAcidDragDrop: false});
        resetPosition(document.getElementById('methylorangeContainer'));
        resetPosition(document.getElementById('naohContainer'));
        //Remove the Sulfuric Acid bottle's dropzone class, so that it cannot be used anymore
        document.getElementById('sulfacidDropzone').classList.remove('sulfacid_dropzone');
        //Remove the Sulfuric Acid bottle's draggable class, so that it cannot be dragged anymore.
        //Set a 1 second timeout, so the user can see that they've finished the step.
        //Reset the Sulfuric Acid bottle back to it's original position
        sulfuricacid.setState({ draggable: false });
        setTimeout(function() {
            //Add "noshow" class to funnel as it isn't used in the next step, so it isn't visible anymore.
            funnel.setState({ visible: false });
            //Remove "noshow" class for elements to be used in the next step, so they are visible again.
            conicalflask.setState({
                noteVisible: true,
                noteContent: "<span id=\"flaskVolume\">0</span> drops",
//                methylDropzoneVisible: true,
                draggable: true,
                dropzone: true,
            });
            //Allow the Methyl Orange Indicator to be a dropzone for the pipette
            methylorange.setState({ dropzone: true });
            naohbottle.setState({ dropzone: true });
            pipette.setState({liquid: 1, draggable: true});
            burette.setState({zindex: 0});
        }, 1000);

        //Clear this interval, so that it will not run anymore.
        clearInterval(sulfuricacid.saIntervalID);
    } else if (state.step == 5) {
        //Remove the Methyl Orange Indicator's dropzone class, so that it cannot be used anymore
        methylorange.setState({dropzone: false});
        conicalflask.setState({interaction: false,
                               dropzone: false, 
                               draggable: false});
        conicalflask.setState({ noteContent: "Assume the flask is being mixed during this step." });
        colourchart.setState({visible: true});
        pipette.setState({draggable: false});
        burette.setState({volumeMarkerVisible: true});
    } else if (state.step == 6) {
        colourchart.setState({visible: false});
        question.setState({visible: true});
        burettetap.setState({closed: true});
    }
}

function update() {
    if (conicalflask.state.filledAmount == 25 && state.step == 1) {
        setState({ step: 2 });
    }

    if (burette.state.inPosition && state.step == 2) {
        setState({ step: 3 });
    }

    if (burette.state.filledAmount == 4 && state.step == 3) {
        //Complete the current step.
        setState({ step: 4 });
    }

    if (conicalflask.state.drops == 5 && conicalflask.state.inPosition  && state.step == 4) {
        setState({ step: 5 });
    }
    if (burette.state.dropAmount == 12 && burettetap.state.closed && state.step == 5) {
        setState({ step: 6 });
    }

    if (question.state.answerCorrect && state.step == 6) {
        setState({ complete: true });
    }
}

//Type 1 = conical flask fail, -1 mark
//Type 2 = titration fail, -3 marks
function failStep(type) {
    //Add the red overlay over the step.
    document.getElementById('stepFailMask').classList.remove('noshow');
    state.marks -= (type == 1 ? 1 : 3);
}

function resetStep() {
    //Remove the red overlay over the step.
    document.getElementById('stepFailMask').classList.add('noshow');
    setState({step: state.step});
    //Reset each element back to it's starting state for that step.
    if(state.step == 1) {
        conicalflask.setState({draggable: true, filledAmount: 0, noteContent: "<span id=\"flaskVolume\">0</span>cm³"});
        pipette.setState({draggable: true, full: false});
        resetPosition(document.getElementById('flaskContainer'));
        resetPosition(document.getElementById('pipetteContainer'));
        warningmessage.setState({visible: false});
    }else if(state.step == 3) {
        methylorange.setState({draggable: true});
        naohbottle.setState({draggable: true});
        sulfuricacid.setState({draggable: true});
        burette.setState({filledAmount: 0})
        resetPosition(document.getElementById('methylorangeContainer'));
        resetPosition(document.getElementById('naohContainer'));
        resetPosition(document.getElementById('sulfacidContainer'));
        warningmessage.setState({visible: false});
    }else if(state.step == 4) {
        conicalflask.setState({draggable: true, drops: 0, noteContent: '<span id=\"flaskVolume\">0</span> drops'});
        pipette.setState({draggable: true, full: false});
        resetPosition(conicalflask.state.element);
        resetPosition(pipette.state.element);
        warningmessage.setState({visible: false});
    }else if(state.step == 5) {
        clearInterval(burette.tiIntervalID);
        burette.setState({filledAmount: 4});
        burette.setState({dropAmount: 0});
        burettetap.setState({closed: true});
        conicalflask.setState({titrationStage: 0}); 
        warningmessage.setState({visible: false});
    }
}

function resetExperiment(showProcedure) {
    clearInterval(burette.tiIntervalID);
    //Reset position of every element
    var elements = ['clampContainer', 'buretteContainer', 'funnelContainer', 'flaskContainer', 'pipetteContainer'];
    for(var i = 0; i < elements.length; i++) {
        resetPosition(document.getElementById(elements[i]));
    }
    
    //Fix appearance of steps so they revert to normal, and set the step text to be the first step.
    for(var stepIterator = 1; stepIterator <= 6; stepIterator++) {
        document.getElementById('step' + stepIterator + 'CompleteBox').classList.add('noshow');
    }
    document.getElementById('stepDesc').innerHTML = config.experimentSteps[0];
    
    setState({
        step: 1,
        complete: false,
        marks: 10
    });
    //Set every element to their default states.
    burette.setState({
        filledAmount: 0,
        dropAmount: 0,
        draggable: false,
        inPosition: false,
        visible: true,
    });
    burettetap.setState({
        closed: false,
        visible: false,
    });
    clamp.setState({
        draggable: false,
        visible: true,
    });
    clampdropzone.setState({
        clampEntered: false,
        visible: false,
    });
    colourchart.setState({
        visible: false,
    });
    completemessage.setState({
        visible: false,
    });
    conicalflask.setState({interaction: null, element: null});
    conicalflask.setState({
        filledAmount: 0,
        titrationStage: 0,
        inPosition: false,
        drops: 0,
        dropzone: true,
        draggable: true,
        visible: true,
        noteVisible: true,
        noteContent: "<span id=\"flaskVolume\">0</span>cm³",
        methylDropzoneVisible: false,
    });
    funnel.setState({
        draggable: false,
        inPosition: false,
        isFilled: false,
        visible: true,
    });
    methylorange.setState({
        draggable: false,
        interaction: null,
        element: null,
        inDropzone: false,
        dropzone: false,
    });
    naohbottle.setState({
        dropzone: true,
    });
    pipette.setState({
        full: false,
        liquid: 0,
        draggable: true,
        interaction: null,
        element: null,
        visible: true,
    });
    question.setState({
        visible: false,
        answerCorrect: false,
    });
    sulfuricacid.setState({
        draggable: false,
        interaction: null,
        element: null,
        inDropzone: false,
    });
    document.getElementById('sulfacidDropzone').classList.add('sulfacid_dropzone');
    warningmessage.setState({
        visible: false,
        message: ""
    });
    completemessage.setState({visible: false});
    experimentprocedure.setState({visible: showProcedure});
}

export default { state, setState, update, failStep, resetStep, resetExperiment };
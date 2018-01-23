import resetPosition from './resetposition.js';
import help from './help.js';
import warningmessage from './warningmessage.js';
import config from './config.js';
import completemessage from './completemessage.js';
import cuCl2Solution from './cucl2solution.js';
import beaker from './beaker.js';
import carbonrods from './carbonrods.js';
import dropzones from './dropzones.js';
import powersupply from './powersupply.js';
import crocclips from './crocclips.js';
import tweezers from './tweezers.js';
import table from './table.js';

var state = {
    step: 1,
    complete: false,
    marks: 10,
    trial: 1,
    step6Repeats: 0,
};

function setState(newState) {
    Object.assign(state, newState);
    
    //Set the help text to be correct for this step.
    help.loadHelpMessage(state.step);
    
    if (state.step <= 6) {
        if(state.step > 1) {
            //Set the previous step's appearance to be green with a tick, to signify that that step is complete.
            document
                .getElementById('step' + (state.step - 1))
                .getElementsByTagName('div')[3]
                .classList.add('stepComplete');
            document
                .getElementById('step' + (state.step - 1))
                .getElementsByTagName('div')[2]
                .getElementsByTagName('img')[0].src = './images/other/greentick.gif';
            //Make the previous step transparent
            document.getElementById('step' + (state.step - 1)).style.opacity = "0.75";
            //Display the 20px whitespace inbetween the completed steps and current step.
            document.getElementById('stepLineBreak' + (state.step - 1)).classList.remove("noshow");
            if(state.step > 2)
                //Remove the separator 2 steps before, so that only one separator is shown.
                document.getElementById('stepLineBreak' + (state.step - 2)).classList.add("noshow");
        }
        //Remove the mask on the current step.
        document
            .getElementById('step' + state.step)
            .getElementsByTagName('div')[3]
            .classList.remove('nohighlight');
        //Show the current step.
        document.getElementById('step' + (state.step)).classList.remove("noshow");
    }
    if (state.complete) {
        document
            .getElementById('step' + state.step)
            .getElementsByTagName('div')[3]
            .classList.add('stepComplete');
        document
            .getElementById('step' + state.step)
            .getElementsByTagName('div')[2]
            .getElementsByTagName('img')[0].src = './images/other/greentick.gif';
        document.getElementById('step' + state.step).classList.remove("noshow");
        //Make the previous step transparent
        document.getElementById('step' + (state.step)).style.opacity = "0.75";
        //Remove the final separator as all the steps are completed.
        document.getElementById('stepLineBreak' + (state.step - 1)).classList.add("noshow");
        completemessage.setState({visible: true});
    }
    
    if(state.step == 2) {
        dropzones.setState({isCuCl2Dropzone: false, isCarbonRodDropzone: true});
        cuCl2Solution.setState({draggable: false});
        cuCl2Solution.state.draggableInteraction.stop();
        resetPosition(document.getElementById('cuCl2Container'));
        carbonrods.setState({draggable: true});
    } else if(state.step == 3) {
        carbonrods.setState({draggable: false});
        crocclips.setState({draggable: true});
        dropzones.setState({isCrocClipDropzone: true});
    } else if(state.step == 4) {
        document.getElementById('powerSupplyDialRotator').addEventListener('click', powersupply.dialIncrease);
    } else if(state.step == 5) {
        document.getElementById('powerSupplyDialRotator').removeEventListener('click', powersupply.dialIncrease);
        table.setState({enabled: true});
        tweezers.setState({draggable: true});
    }
}

function update() {
    if(beaker.state.volume == 50 && state.step == 1)
        setState({step: 2});
    else if(carbonrods.state.inPosition && state.step == 2)
        setState({step: 3});
    else if(crocclips.state.inPosition && state.step == 3)
        setState({step: 4});
    else if(powersupply.state.isOn && state.step == 4)
        setState({step: 5});
}

//Set the current step's overlay to be red and set the result picture to be empty. Also subtract marks (specified in parameter - marksLost)
function failStep(marksLost) {
    document
        .getElementById('step' + (state.step))
        .getElementsByTagName('div')[3]
        .classList.add('stepFail');
    document
        .getElementById('step' + (state.step))
        .getElementsByTagName('div')[2]
        .getElementsByTagName('img')[0].src =
        './images/other/empty.png';
    setState({marks: state.marks - marksLost});
}

function resetStep() {
    document
        .getElementById('step' + (state.step))
        .getElementsByTagName('div')[3]
        .classList.remove('stepFail');
    setState({step: state.step});
    if(state.step == 1) {
        resetPosition(document.getElementById('cuCl2Container'));
        //Call setState for the beaker twice as we need to volume to update so the label is accurate. If we did it at the same time, the label would be 5cm³ below the correct value.
        beaker.setState({volume: 0});
        beaker.setState({labelContent: "Volume: <span id=\"volumeHighlight\">" + beaker.state.volume + "cm³</span>"});
        cuCl2Solution.setState({draggable: true, inDropzone: false});
        warningmessage.setState({visible: false});
    } else if(state.step == 2) {
        resetPosition(document.getElementById('carbonRod1Container'));
        resetPosition(document.getElementById('carbonRod2Container'));
        carbonrods.setState({draggable: true});
        warningmessage.setState({visible: false});
    } else if(state.step == 4) {
        powersupply.setState({dialClicks: 0, isOn: false});
        document.getElementById('powerSupplyDialRotator').addEventListener('click', powersupply.dialIncrease);
        warningmessage.setState({visible: false});
    }
}

function resetExperiment() {
    //Fix appearance of steps so they revert to normal
    for(var stepIterator = 1; stepIterator <= 6; stepIterator++) {
        document
            .getElementById('step' + stepIterator)
            .getElementsByTagName('div')[3]
            .classList.remove('stepComplete');
        document
            .getElementById('step' + stepIterator)
            .getElementsByTagName('div')[2]
            .getElementsByTagName('img')[0].src =
            './images/other/empty.png';
        if(stepIterator > 1)    document.getElementById('step' + stepIterator).classList.add('noshow');
        document.getElementById('step' + stepIterator).style.opacity = "1";
    }
    
    setState({step: 1});
}

export default { state, setState, update, failStep, resetStep, resetExperiment };

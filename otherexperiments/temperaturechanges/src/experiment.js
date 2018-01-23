import resetPosition from './resetposition.js';
import help from './help.js';
import measuringcylinder50 from './measuringcylinder50.js';
import measuringcylinder10 from './measuringcylinder10.js';
import polystyrenecup from './polystyrenecup.js';
import hclbottle from './hclbottle.js';
import naohbottle from './naohbottle.js';
import warningmessage from './warningmessage.js';
import beaker from './beaker.js';
import thermometer from './thermometer.js';
import table from './table.js';
import config from './config.js';
import completemessage from './completemessage.js';
import dropzones from './dropzones.js';

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
    
    //While the currentStep is less than 7, we set the currentStep to be complete, add the highlight to the next step and increase currentStep
    //We need a special case for step 7, as there isn't another step after it to add the highlight too, thus it would produce errors.
    if (state.step <= 8) {
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
        hclbottle.setState({draggable: false});
        naohbottle.setState({draggable: false});
        dropzones.setState({isHclDropzone: false});
        measuringcylinder50.setState({volume: 0, draggable: false});
        polystyrenecup.setState({draggable: false});
        //Reset the positions of the naoh bottle and 50cm3 measuring cylinder.
        resetPosition(document.getElementById('hclContainer'));
        resetPosition(document.getElementById('measuringCylinder50Container'));
        
        beaker.setState({draggable: true});
    }else if(state.step == 3) {
        polystyrenecup.setState({draggable: false, isThermometerDropzone: true});
        thermometer.setState({draggable: true, labelVisible: true, celciusMeasured: config.thermometerTemperatures[state.trial - 1][0]});
        table.setState({enabled: true});
    }else if(state.step == 4) {
        dropzones.setState({isNaohDropzone: true});
        thermometer.setState({draggable: false, inDropzone: false});
        hclbottle.setState({draggable: true});
        naohbottle.setState({draggable: true});
        measuringcylinder10.setState({draggable: true});
        resetPosition(document.getElementById('thermometerContainer'));
        polystyrenecup.setState({labelVisible: true});
    }else if(state.step == 5) {
        measuringcylinder10.setState({volume: 0, draggable: false});
        hclbottle.setState({draggable: false});
        naohbottle.setState({draggable: false});
        resetPosition(document.getElementById('naohContainer'));
        resetPosition(document.getElementById('measuringCylinder10Container'));
        thermometer.setState({draggable: true});
    }else if(state.step == 6) {
        //For step 4 and step 5, remove the green overlay and green tick, as they have to be repeated again.
        for(var i = 4; i <= 5; i++) {
            document
                .getElementById('step' + (i))
                .getElementsByTagName('div')[3]
                .classList.remove('stepComplete');
            document
                .getElementById('step' + (i))
                .getElementsByTagName('div')[2]
                .getElementsByTagName('img')[0].src = './images/other/empty.png';
            //Make the previous step transparent
            document.getElementById('step' + (i)).style.opacity = '1';
        }
        document.getElementById('step5').classList.add('noshow');
    }else if(state.step == 7) {
        //Set step 5 to be completed, and remove the whitespace break between step 4 and step 5.
        document.getElementById('step5').style.opacity = '0.75';
        document.getElementById('step5').getElementsByTagName('div')[3].classList.add('stepComplete');
        document.getElementById('step5').getElementsByTagName('div')[2].getElementsByTagName('img')[0].src = './images/other/greentick.gif';
        document.getElementById('stepLineBreak4').classList.add("noshow");
        //step6Repeats will be under 13 for the first trial, so we need to reset the experiment (false for not resetting table).
        //When all readings have been completed for trial 2, step6Repeats won't be <13, so we run the update() function instead.
        if(state.step6Repeats < 13) {
            resetExperiment(false);
        } else
            update();
    }else if(state.step == 8) {
        //Set all the number inputs on the final column to be disabled. 
        for(var row = 0; row <= 8; row++) {
            document.getElementById('ti_' + row + '-2').disabled = false;
        }
        thermometer.setState({draggable: false});
    }
}

function update() {
    if(polystyrenecup.state.volume == 30 && state.step == 1)
        setState({step: 2});
    else if(polystyrenecup.state.inPosition && state.step == 2)
        setState({step: 3});
    else if(state.step == 3)
        setState({step: 4});
    //If the NaOH volume in the cup is correct for this step. Trial 2 needs it's own check as step6Repeats will be > 7, so 5 * (state.step6Repeats + 1) will go over 40cm3. Therefore we need to subtract 6 before multiplying by 5 to get the correct volume again.
    else if(polystyrenecup.state.naohVolume == (state.trial == 1 ? (5 * (state.step6Repeats + 1)) : (5 * (state.step6Repeats - 6))) && state.step == 4)
        setState({step: 5});
    //Checking whether the first cell of the correct trial column isn't empty.
    else if(document.getElementById('ti_1-' + (state.trial - 1)).value != "" && state.step == 5) {
        if((state.step6Repeats <= 6 && state.trial == 1) || (state.step6Repeats <= 13 && state.trial == 2)) {
            measuringcylinder10.setState({shouldPour: false, inDropzone: false});
            setState({step6Repeats: state.step6Repeats + 1, step: 6});
            setState({step: 4});
        } else
            setState({step: 7, trial: 2});
    } else if(state.trial == 2 && state.step == 7)
        setState({step: 8});
    else if(table.state.meansCorrect == 9 && state.step == 8) {
        //Toggle the table so it isn't visible, and complete the experiment (complete message will be displayed);
        table.toggleTable();
        setState({complete: true});
    }
}

function failStep(stepNumber, marksLost) {
    //Set the current step's overlay to be red and set the result picture to be empty. Also subtract marks (specified in parameter - marksLost)
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
        clearTimeout(hclbottle.dropzoneFillTimerID);
        resetPosition(document.getElementById('hclContainer'));
        resetPosition(document.getElementById('naohContainer'));
        resetPosition(document.getElementById('measuringCylinder50Container'));
        resetPosition(document.getElementById('polystyreneCupContainer'));       
        measuringcylinder50.setState({volume: 0, shouldPour: false});
        polystyrenecup.setState({volume: 0});
        hclbottle.setState({draggable: true, inDropzone: false});
        naohbottle.setState({draggable: true});
        measuringcylinder50.setState({draggable: true});
        polystyrenecup.setState({draggable: true});
        
        warningmessage.setState({visible: false});
    }else if(state.step == 4) {
        clearTimeout(naohbottle.dropzoneFillTimerID);
        resetPosition(document.getElementById('hclContainer'));
        resetPosition(document.getElementById('naohContainer'));
        resetPosition(document.getElementById('measuringCylinder10Container'));    
        measuringcylinder10.setState({volume: 0, shouldPour: false, draggable: true, inDropzone: false});
        hclbottle.setState({draggable: true});
        naohbottle.setState({draggable: true, inDropzone: false});
        
        warningmessage.setState({visible: false});
    }
}

function resetExperiment(resetTable) {
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
    
    //Reset position of polystyrene cup and beaker
    resetPosition(document.getElementById('polystyreneCupContainer'));
    resetPosition(document.getElementById('beakerContainer'));
    resetPosition(document.getElementById('thermometerContainer'));
    
    //Reset every object to it's default state
    beaker.state.dropzoneDraggable.snap(false);
    beaker.setState({draggable: false, dropzoneDraggable: false});
    dropzones.setState({isHclDropzone: true, isNaohDropzone: false});
    hclbottle.setState({draggable: true, inDropzone: false});
    measuringcylinder10.setState({draggable: false, inDropzone: false, volume: 0, shouldPour: false, dragInteraction: null});
    measuringcylinder50.setState({draggable: true, inDropzone: false, volume: 0, shouldPour: false, dragInteraction: null});
    naohbottle.setState({draggable: false, inDropzone: false});
    polystyrenecup.state.dropzoneDraggable.snap(false);
    polystyrenecup.setState({draggable: true, volume: 0, naohVolume: 0, inPosition: false, isThermometerDropzone: false, labelVisible: false, dropzoneDraggable: null});
    if(resetTable)  table.setState({draggable: false, toggled: false, enabled: false});
    thermometer.setState({draggable: false, celciusMeasured: 21.00, labelVisible: false, inDropzone: false});
    setState({step: 1});
}

export default { state, setState, update, failStep, resetStep, resetExperiment };

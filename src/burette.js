import config from './config.js';
import burettetap from './burettetap.js';
import conicalflask from './conicalflask.js';
import experiment from './experiment.js';
import warningmessage from './warningmessage.js';

var state = {
    filledAmount: 0,
    dropAmount: 0,
    draggable: false,
    inPosition: false,
    visible: true,
    volumeMarkerVisible: false,
    zindex: 0,
};

var tiIntervalID; //IntervalID for use when the burette tap is opened, so that we can clear the "setInterval" command.
var startPos = null; //for burette, so it snaps back to original position when not in dropzone

function setState(newState) {
    Object.assign(state, newState);
    //Set the burette image to the correct image stage.
    if (state.filledAmount <= 4 && state.dropAmount == 0)
        document.getElementById('buretteImg').src = config.buretteImages[state.filledAmount];
    else if (state.dropAmount > 0)
        //Set the burette image to the correct one that displays the right level.
        document.getElementById('buretteImg').src = config.buretteTitrationImages[state.dropAmount];

    if (state.draggable)
        document.getElementById('buretteContainer').classList.add('burette_draggable');
    else
        document.getElementById('buretteContainer').classList.remove('burette_draggable');

    if (state.visible)
        document.getElementById('buretteContainer').classList.remove('noshow');
    else
        document.getElementById('buretteContainer').classList.add('noshow');
    
    if (state.volumeMarkerVisible)
        document.getElementById('buretteVolumeMarker').classList.remove('noshow');
    else
        document.getElementById('buretteVolumeMarker').classList.add('noshow');
    
    //Set the distance of the burette's volume marker from the top to correctly match the top of the liquid in the burette.
    //Also set the text to indicate the volume in the burette.
    if(experiment.state.step == 5) {
        if(state.dropAmount == 1) document.getElementById('buretteVolumeMarker').style.top ="-3px";
        else {
            if(state.dropAmount == 2)
                document.getElementById('buretteVolumeMarker').style.top = "12.6px";   
            else if(state.dropAmount < 9)
                document.getElementById('buretteVolumeMarker').style.top = (parseInt(document.getElementById('buretteVolumeMarker').style.top) + 10.15) + "px";
            else
                document.getElementById('buretteVolumeMarker').style.top = (parseInt(document.getElementById('buretteVolumeMarker').style.top) + 10.675) + "px";
        }
        document.getElementById('buretteVolumeMarker').innerHTML = (2 * state.dropAmount) + "cm³";
    }
    
    document.getElementById('buretteContainer').style.zIndex = state.zindex;
}

function startTitration() {
    //If the burette drop amount is < 13, and the tap is open.
    if (state.dropAmount < 13 && !burettetap.state.closed) {
        //Increase the burette drop amount by 1.
        setState({ dropAmount: state.dropAmount + 1 });
        //For every 3 drops:
        if (state.dropAmount % 3 === 0) {
            //Increase the flask titration stage by 1.
            conicalflask.setState({
                titrationStage: conicalflask.state.titrationStage + 1,
            });
        }
    }
    if(state.dropAmount == 13) {
        conicalflask.setState({
            titrationStage: 5,
        });
        burettetap.toggleTapState();
        experiment.failStep();
        warningmessage.setState({message: "You have have added too many acid drops. Reset the step and try again. -3 marks.", visible: true});
    }
    experiment.update();
}

export default { state, setState, startTitration };

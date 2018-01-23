import experiment from './experiment.js';
import warningmessage from './warningmessage.js';

var state = {
    dialClicks: 0,
    isOn: false,
};

function setState(newState) {
    Object.assign(state, newState);
    if(state.dialClicks > 5)    state.dialClicks = 0;
    document.getElementById('powerSupplyDialRotator').style.transform = "rotate(" + (60*state.dialClicks) + "deg)";
    document.getElementById('powerSupplyVolts').innerHTML = state.dialClicks + "V";    
    document.getElementById('powerSupplyOnSwitch').style.backgroundColor = state.isOn ? "#0f0" : "#f00";
}

function dialIncrease() {
    setState({dialClicks: state.dialClicks+1});
}

function turnOn() {
    if(experiment.state.step == 4) {
        if(state.dialClicks == 4) {
            setState({isOn: !state.isOn});
            experiment.update();
        } else {
            warningmessage.setState({message: "You have chosen the wrong voltage. Select the right voltage before turning the power supply on. -1 mark.", visible: true});
            experiment.failStep(1);
            document.getElementById('powerSupplyDialRotator').removeEventListener('click', dialIncrease);
        }
    }
}

export default { state, setState, dialIncrease, turnOn };
import experiment from './experiment.js';

var state = {
    visible: false,
}

function setState(newState) {
    Object.assign(state, newState);
    document.getElementById('completeMessageMarks').innerHTML = experiment.state.marks + "/10";
    if(state.visible)
        document.getElementById("completeContainer").classList.remove('noshow');
    else
        document.getElementById("completeContainer").classList.add('noshow');

}

export default { state, setState };

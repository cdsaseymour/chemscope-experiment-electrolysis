import config from './config.js';

var state = {
    toggled: false,
};

function setState(newState) {
    Object.assign(state, newState);
    if (state.toggled) {
        document.getElementById('helpContainer').classList.add('helpOpen');
        document.getElementById('helpTitleContainer').classList.remove('noshow');
        document.getElementById('helpContentContainer').classList.remove('noshow');
    } else {
        document.getElementById('helpContainer').classList.remove('helpOpen');
        document.getElementById('helpTitleContainer').classList.add('noshow');
        document.getElementById('helpContentContainer').classList.add('noshow');
    }
}

function loadHelpMessage(experimentStep) {
    document.getElementById('helpContent').innerHTML = config.helpMessages[experimentStep - 1];
}

function toggleHelp() {
    setState({toggled: !state.toggled});
}

export default { state, setState, loadHelpMessage, toggleHelp };

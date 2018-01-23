import dropzone from './dropzone.js';
import experiment from './experiment.js';

var state = {
    disabled: true,
    contentVisible: false,
    timesUsed: 0,
    hintMessage: ""
}

function setState(newState) {
    Object.assign(state, newState);
    document.getElementById("hint_titlebtn").disabled = state.disabled;
    document.getElementById("hint_content").style.visibility = state.contentVisible ? "visible" : "hidden";
    document.getElementById("hint_contentp").innerHTML = state.hintMessage;
}

function toggleHint() {
    setState({contentVisible: !state.contentVisible});
    if(state.contentVisible && !dropzone.state.currentChemical.state.hintUsed) {
        dropzone.state.currentChemical.setState({hintUsed: true});
        experiment.setState({marks: experiment.state.marks-1});
    }
}

export default { state, setState, toggleHint };

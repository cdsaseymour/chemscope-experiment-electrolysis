import experiment from './experiment.js';

var state = {
    visible: false,
    answerCorrect: false,
};

function setState(newState) {
    Object.assign(state, newState);
    if (state.visible) {
        document.getElementById('questions').classList.remove('noshow');
    } else {
        document.getElementById('questions').classList.add('noshow');
    }
}

function checkAnswer(answer) {
    //Get the user's input.
    var answer = document.getElementById('questionAnswer').value.toLowerCase();
    if (answer == '24ml' || answer == '24') {
        //Set the image to display a green tick.
        setState({ answerCorrect: true });
        experiment.update();
    } else {
        //Set the image to display a red x.
        experiment.setState({marks: experiment.state.marks-1});
    }
}

export default { state, setState, checkAnswer };

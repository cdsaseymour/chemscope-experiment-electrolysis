import dropzone from './dropzone.js';
import lithium from './lithium.js';
import experiment from './experiment.js';

var state = {
    visible: false,
    showResult: false
}

function setState(newState) {
    Object.assign(state, newState);
    if(state.visible)
        document.getElementById("answer_container").classList.remove('noshow');
    else {
        document.getElementById("answer_container").classList.add('noshow');
        document.getElementById("answer_text").value = "";
    }
    if(state.showResult)
        document.getElementById("answer_container").classList.add("result");
    else
        document.getElementById("answer_container").classList.remove("result");
}


function checkAnswer() {
    var answer = document.getElementById("answer_text").value;
    if (answer === "") return;
    setState({showResult: true});
    var answerResult = document.getElementById("answer_result");
    var names = dropzone.state.currentChemical.state.names;
    for(var i = 0; i < names.length; i++) {
        if(answer.toLowerCase() == names[i].toLowerCase()) {
            answerResult.src = "./images/other/greentick.gif";
            dropzone.state.currentChemical.setState({hasGuessed: true});
            experiment.update();
            return;
        }
    }
    experiment.setState({marks: experiment.state.marks-1});
    answerResult.src = "./images/other/redcross.png";
}

export default { state, setState, checkAnswer };

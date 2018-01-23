import experiment from './experiment.js';

var state = {
    visible: false,
    questionsComplete: 0
}

function setState(newState) {
    Object.assign(state, newState);
    if(state.visible)
        document.getElementById("questions_container").classList.remove("noshow");
    else
        document.getElementById("questions_container").classList.add("noshow");
}

//Function used to check the question answers.
//Messy code, however get's the job done.
function checkQuestionAnswer(question) {
    var answer;
    if (question == 1) {
        answer = document.getElementById("questionone_text").value.toLowerCase();
        if (answer == "k" || answer == "potassium") {
            document.getElementById("questionone_result").src =
            "./images/other/greentick.gif";
            setState({questionsComplete: state.questionsComplete+1});
        } else {
            document.getElementById("questionone_result").src =
            "./images/other/redcross.png";
            experiment.setState({marks: experiment.state.marks-1});
        }
    } else if (question == 2) {
        answer = document.getElementById("questiontwo_text").value.toLowerCase();
        if (answer == "ca" || answer == "calcium") {
            document.getElementById("questiontwo_result").src =
            "./images/other/greentick.gif";
            setState({questionsComplete: state.questionsComplete+1});
        } else {
            document.getElementById("questiontwo_result").src =
            "./images/other/redcross.png";
            experiment.setState({marks: experiment.state.marks-1});
        }
    } else if (question == 3) {
        answer = document.getElementById("questionthree_text").value.toLowerCase();
        if (answer == "salt") {
            document.getElementById("questionthree_result").src =
            "./images/other/greentick.gif";
            setState({questionsComplete: state.questionsComplete+1});
        } else {
            document.getElementById("questionthree_result").src =
            "./images/other/redcross.png";
            experiment.setState({marks: experiment.state.marks-1});
        }
    }
    experiment.update();
}

export default { state, setState, checkQuestionAnswer };

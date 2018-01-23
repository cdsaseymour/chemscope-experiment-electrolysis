import chemicals from './chemicals.js';
import questions from './questions.js';
import hint from './hint.js';
import completemessage from './completemessage.js';

var state = {
    step: 1,
    complete: false,
    marks: 10
};

function setState(newState) {
    Object.assign(state, newState);
    
    console.log(state.marks);
    
    if(state.marks < 3) state.marks = 0;
    
    //Add the green complete mask and green tick to the previous step, and highlight the current one.
    if (state.step <= 2) {
        document
        .getElementById('step' + (state.step - 1))
        .getElementsByTagName('div')[3]
        .classList.add('stepComplete');
        document
        .getElementById('step' + (state.step - 1))
        .getElementsByTagName('div')[2]
        .getElementsByTagName('img')[0].src =
        './images/other/greentick.gif';
        document
        .getElementById('step' + state.step)
        .getElementsByTagName('div')[3]
        .classList.remove('nohighlight');
    }
    //Add the green complete mask and green tick to the current step.
    //This is as a separate if statement, as only using the one above will not correctly add masks etc. for the last step.
    if (state.complete) {
        document
        .getElementById('step' + state.step)
        .getElementsByTagName('div')[3]
        .classList.add('stepComplete');
        document
        .getElementById('step' + state.step)
        .getElementsByTagName('div')[2]
        .getElementsByTagName('img')[0].src =
        './images/other/greentick.gif';
        completemessage.setState({visible: true});
    }
    
    //Set the questions to be visible.
    if(state.step == 2) {
        questions.setState({visible: true});
    }
}

function update() {
    if(state.step == 1) {
        var completeAmount = 0;
        //Loop through all the chemicals, and if each one has been guessed (state.hasGuessed), we go to the next step.
        for(var i = 0; i < chemicals.chemicals.length; i++) {
            var chemical = chemicals.chemicals[i];
            if(chemical.state.hasGuessed) completeAmount++;
            else    return;
        }
        if(completeAmount == 5) setState({step: 2});
    } else if(state.step == 2 && questions.state.questionsComplete == 3) {
        //Complete the experiment, and deduct marks for hint use (-1 mark for each hint).
        //Hint use is worked out by each time the hint is opened.
        setState({complete: true, marks: (state.marks - hint.state.timesUsed)});
    }
}

export default { state, setState, update };

import interact from 'interactjs';
import hint from './hint.js';
import answerbox from './answerbox.js';
import dropzone from './dropzone.js';
import chemicals from './chemicals.js';
import flamecolour from './flamecolour.js';
import questions from './questions.js';

interact(".dropzone").dropzone({
    // only accept elements matching this CSS selector
    accept: ".drag-drop",
    // Require a 6% element overlap for a drop to be possible
    overlap: 0.06,
    ondragenter: function(event) {
        //Set the currentChemical to the result of the 'findChemical' function in chemicals.
        dropzone.setState({currentChemical: chemicals.findChemical(event.relatedTarget.getAttribute('id'))});
        //Set the hint message depending on what hintType the current chemical is.
        hint.setState({hintMessage: (dropzone.state.currentChemical.state.hintType == 0 ? "This metal ion is part of <b>Group 1</b> of the periodic table. These are called the <b>Alkali Metals</b>." : "This metal ion is part of <b>Group 2</b> of the periodic table. These are called the <b>Alkaline Earth Metals</b>.")});
        var chemical = event.relatedTarget.dataset.chemical;
        var elements = document.getElementsByClassName("flame");
        //Loop through all the elements that make up the moving flame, and give them the "hasChemical" class, as well as the currentChemical's name class
        //This is used so that the flame can change different colours depending on the currentChemical
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.add("hasChemical");
            elements[i].classList.add(dropzone.state.currentChemical.state.names[1]);
        }
        //Allow the flame colour message besides the flame to be visible.
        flamecolour.setState({visible: true});
        if (!dropzone.state.currentChemical.state.hasGuessed) {
            //Allow the hint to be used and answer box to be seen if the currentChemical hasn't been guessed yet.
            answerbox.setState({visible: true});
            hint.setState({disabled: false});
        }
    },
    ondragleave: function(event) {
        //Loop through all the elements that make up the moving flame, and remove the "hasChemical" class, as well as the currentChemical's name class from them
        //This is used so that the flame can change back to it's default colour
        var elements = document.getElementsByClassName("flame");
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove("hasChemical");
            elements[i].classList.remove(dropzone.state.currentChemical.state.names[1]);
        }
        //Set the currentChemical to null, as there is no chemical in the flame.
        //This is done after the for loop above, as that uses the currentChemical, thus if we did it before it would be null and fail.
        dropzone.setState({currentChemical: null});
        //Set the hint to be disabled, and hide the hint content. This is so that when a chemical is put back into the flame, the hint is closed and not open.
        hint.setState({disabled: true, contentVisible: false});
        //Set the flame colour message to not be visible anymore as the flame is the default colour.
        flamecolour.setState({visible: false});
        //Hide the answer box and clear the previous answer in the text box.
        answerbox.setState({visible: false, showResult: false});
    }
});

interact(".draggable").draggable({
    // enable inertial throwing
    inertia: false,
    // keep the element within the area of it's parent
    restrict: {
        restriction: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,
    
    // call this function on every dragmove event
    onmove: dragMoveListener,
});

function dragMoveListener(event) {
    var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx,
    y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px, " + y + "px)";

    // update the posiion attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
}

//Link the functions called by buttons in html to the right ones.
window.toggleHint = hint.toggleHint;
window.checkAnswer = answerbox.checkAnswer;
window.checkQuestionAnswer = questions.checkQuestionAnswer;
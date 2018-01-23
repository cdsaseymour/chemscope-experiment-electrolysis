import interact from 'interactjs';
import config from './config';
import experiment from './experiment.js';
import pipette from './pipette.js';
import conicalflask from './conicalflask.js';
import burette from './burette.js';
import clamp from './clamp.js';
import clampdropzone from './clampdropzone.js';
import burettetap from './burettetap.js';
import funnel from './funnel.js';
import sulfuricacid from './sulfuricacid.js';
import methylorange from './methylorange.js';
import question from './question.js';
import warningmessage from './warningmessage.js';
import naohbottle from './naohbottle.js';

let scale = 1;

var helpState = false; //Whether the user has toggled the help.

function init() {

    /* --- Dropzone functions --- */

    interact('.clamp_dropzone').dropzone({
        accept: '.clamp_drag-drop',
        overlap: 'center',
        ondragenter: function(event) {
            //Set the 'dropRect' variable to be equal to the dropzone's rectangle,
            //and set 'dropCenter' to be the coordinates of the center of the dropzone.
            var dropRect = interact.getElementRect(event.target),
            dropCenter = {
                x: dropRect.left + dropRect.width / 2,
                y: dropRect.top + dropRect.height / 2,
            };
            //Snap the clamp to the center of the dropzone when it enters.
            event.draggable.snap({ anchors: [dropCenter] });

            //Enable the dropzone border so that the user knows where the dropzone is.
            clampdropzone.setState({ clampEntered: true });
        },
        ondragleave: function(event) {
            //Set the clamp's snap to false, so it will not snap to the center if it is outside the dropzone.
            event.draggable.snap(false);
            //Remove the dropzone border indication, as the clamp is no longer in the dropzone.
            clampdropzone.setState({ clampEntered: false });
        },
        ondrop: function(event) {
            //Allow dragging of the burette container.
            burette.setState({ draggable: true });
            //Remove dragging on the clamp, as it is in the correct place.
            clamp.setState({ draggable: false });
            //Remove the dropzone border indication, as the clamp is already dropped in the dropzone.
            //The clamp has already been dropped, so we no longer need to show the dropzone.
            clampdropzone.setState({ clampEntered: false, visible: false });
        },
    });

    interact('.burette_dropzone').dropzone({
        accept: '.burette_drag-drop',
        overlap: 0.6,
        ondragenter: function(event) {
                //Set the 'dropRect' variable to be equal to the dropzone's rectangle,
            //and set 'dropCenter' to be the coordinates of the center of the dropzone.
            var dropRect = interact.getElementRect(event.target),
            dropCenter = {
                x: dropRect.left + dropRect.width / 2,
                y: dropRect.top + dropRect.height / 2,
            };
            //Snap the burette to the center of the dropzone when it enters.
            event.draggable.snap({ anchors: [dropCenter] });
        },
        ondragleave: function(event) {
            //When the burette leaves the dropzone, snap it back to it's starting position.
            //This is so the user knows that it isn't in the correct place.
            event.draggable.snap({ anchors: [burette.startPos] });
        },
        ondrop: function(event) {
            burette.setState({ inPosition: true });
            experiment.update();
        },
    });

    interact('.funnel_dropzone').dropzone({
        accept: '.funnel_drag-drop',
        overlap: 0.3,
        ondragenter: function(event) {
            //Set the 'dropRect' variable to be equal to the dropzone's rectangle,
            //and set 'dropCenter' to be the coordinates of the center of the dropzone.
            var dropRect = interact.getElementRect(event.target),
            dropCenter = {
                x: dropRect.left + dropRect.width / 2,
                y: dropRect.top + dropRect.height / 2,
            };
            //Snap the funnel to the center of the dropzone when it enters.
            event.draggable.snap({ anchors: [dropCenter] });
        },
        ondragleave: function(event) {},
        ondrop: function(event) {
            //Remove dragging on drop, as it is in the correct place.
            funnel.setState({ draggable: false });
            //Set the funnel's image to be correct for it's position - the image only shows half of the funnel.
            //This is to give the illusion that the rest of the funnel is inside the top of the burette.
            funnel.setState({ inPosition: true });
            //Add dragging to the Sulfuric Acid bottle, as it is needed to complete the step.
            //Also add dragging to the methyl orange and naoh bottle. If the user uses this instead, they will fail
            sulfuricacid.setState({ draggable: true });
            methylorange.setState({draggable: true, sulfuricAcidDragDrop: true});
            naohbottle.setState({draggable: true, sulfuricAcidDragDrop: true});
        },
    });

    interact('.sulfacid_dropzone').dropzone({
        accept: '.sulfacid_drag-drop',
        overlap: 0.05,
        ondragenter: function(event) {
            //If the methyl orange or naoh bottle are dragged over the dropzone, lose marks
            if(event.relatedTarget.getAttribute('id') == "methylorangeContainer" || event.relatedTarget.getAttribute('id') == "naohContainer") {
                    warningmessage.setState({message: "You have put the wrong liquid in the burette. Reset this step and try again. -1 mark.", visible: true});
                    methylorange.setState({draggable: false});
                    naohbottle.setState({draggable: false});
                    sulfuricacid.setState({draggable: false});
                    experiment.failStep(1);
            } else {
                //Set the Sulfuric Acid's "inDropzone" data-attribute to true. This is used in the "sa_dragMoveListener" function.
                sulfuricacid.setState({ inDropzone: true });
                //Set the transform of the Sulfuric Acid to be: current translate + new rotation of 80degrees.
                event.relatedTarget.style.transform =
                event.relatedTarget.style.transform.split('rotate')[0] +
                'rotate(80deg)';
                //Set the funnel image to be the image showing it being filled up.
                funnel.setState({ isFilled: true });

                //Set the "sulfuricacid.saIntervalID" to be a setInterval function, and have this function increase the burette filled stage every second.
                sulfuricacid.saIntervalID = setInterval(function() {
                //We use < 3 as at stage 4, we need to run more code. If it was < 4, there would be another second before this code would be run.
                if (burette.state.filledAmount <= 4)
                    burette.setState({ filledAmount: burette.state.filledAmount + 1 });
                    experiment.update();
                }, 1000);
            }
        },
        ondragleave: function(event) {
            //Set the Sulfuric Acid's "inDropzone" data-attribute to false. This is used in the "sa_dragMoveListener" function.
            sulfuricacid.setState({ inDropzone: false });
            //Set the funnel image to be the image showing it being empty.
            funnel.setState({ isFilled: false });

            //Clear the setInterval command
            clearInterval(sulfuricacid.saIntervalID);
        },
        ondrop: function(event) {
            //Set the Sulfuric Acid's "inDropzone" data-attribute to false. This is used in the "sa_dragMoveListener" function.
            sulfuricacid.setState({ inDropzone: false });
            //Set the funnel image to be the image showing it being empty.
            funnel.setState({ isFilled: false });

            //Clear the setInterval command
            clearInterval(sulfuricacid.saIntervalID);
        },
    });

    interact('.flask_dropzone').dropzone({
        accept: '.flask_drag-drop',
        overlap: 0.45,
        ondragenter: function(event) {
            //Set the 'dropRect' variable to be equal to the dropzone's rectangle,
            //and set 'dropCenter' to be the coordinates of the center of the dropzone.
            var dropRect = interact.getElementRect(event.target),
            dropCenter = {
                x: dropRect.left + dropRect.width / 2,
                y: dropRect.top + dropRect.height / 2,
            };
            //Snap the flask to the center of the dropzone when it enters.
            event.draggable.snap({ anchors: [dropCenter] });
        },
        ondragleave: function(event) {
            //Set the flask's snap to false, so it will not snap to the center if it is outside the dropzone.
            event.draggable.snap(false);
        },
        ondrop: function(event) {
            //If the flaskDropAmount is 5 (From step 4)
            if (conicalflask.state.drops == 5) {
                /*-Sets the conical flask's drops' visibility to false.
                -Also sets the conical flask to not be draggable.*/
                conicalflask.setState({
                    inPosition: true,
                });
                //Complete the current step.
                experiment.update();
            }
        },
    });

    var tipInDrop = false;
    
    interact('.pipette-naoh_dropzone').dropzone({
        accept: '.pipette_drag-drop',
        overlap: 0.05,
        ondragenter: function(event) {
            //If the pipette's "full" data-attribute is false, and the flask filled stage is < 6
            if (pipette.state.full == false && conicalflask.state.filledAmount <= 25) {
                pipette.setState({ liquid: 0, full: true });
            } else if(pipette.state.full && conicalflask.state.filledAmount <= 25 && pipette.state.liquid != 0) {
                pipette.setState({ liquid: 0 });
            }
        },
        ondragleave: function(event) {},
        ondropmove: function(event){},
    });
    
    interact('.pipette-methylorange_dropzone').dropzone({
        accept: '.pipette_drag-drop',
        overlap: 0.35,
        ondragenter: function(event) {
            //If the pipette's "full" data-attribute is false, and the flask filled stage is < 6
            if (pipette.state.full == false && conicalflask.state.drops <= 5) {                
                pipette.setState({ liquid: 1, full: true });
            } else if(pipette.state.full && conicalflask.state.drops <= 5 && pipette.state.liquid != 1) {
                pipette.setState({ liquid: 1 });
            }
        },
        ondragleave: function(event) {},
    });
    
    interact('.pipette-sulfacid_dropzone').dropzone({
        accept: '.pipette_drag-drop',
        overlap: 0.35,
        ondragenter: function(event) {
            //If the pipette's "full" data-attribute is false, and the flask filled stage is < 6
            if (pipette.state.full == false && conicalflask.state.drops <= 5) {                
                pipette.setState({ liquid: 2, full: true });
            } else if(pipette.state.full && conicalflask.state.drops <= 5 && pipette.state.liquid != 2) {
                pipette.setState({ liquid: 2 });
            }
        },
        ondragleave: function(event) {},
    });

    interact('.pipette-flask_dropzone').dropzone({
        accept: '.pipette_drag-drop',
        overlap: 0.01,
        ondragenter: function(event) {
            //If the pipette's "full" data-attribute is true -> this is the case after it has been filled by the NaOH bottle.
            if (pipette.state.full == true) {
                pipette.setState({ full: false });
                if(experiment.state.step == 1) {
                    //Increase the flask filled stage.
                    //Here we call setState twice, instead of calling it once and including both properties.
                    //This is because, this way, the note will properly update with the NaOH amount (if not, it will skip the first time.)
                    if(pipette.state.liquid == 0) {
                        conicalflask.setState({filledAmount: conicalflask.state.filledAmount + 5});
                        conicalflask.setState({noteContent: "<span id=\"flaskVolume\">" + conicalflask.state.filledAmount + "</span>cm³"});   
                    } else {
                        warningmessage.setState({message: "You have put the wrong liquid in the flask. Reset this step and try again. -1 mark.", visible: true});
                        conicalflask.setState({draggable: false});
                        pipette.setState({draggable: false});
                        experiment.failStep(1);
                    }
                }else if(experiment.state.step == 4) {
                    //Increase the flask drop amount.
                    //Here we call setState twice, instead of calling it once and including both properties.
                    if(pipette.state.liquid == 1) {
                        conicalflask.setState({ drops: conicalflask.state.drops + 1 });
                        conicalflask.setState({ noteContent: '<span id=\"flaskVolume\">' + conicalflask.state.drops + '</span> drops' });
                    } else {
                        warningmessage.setState({message: "You have put the wrong liquid in the flask. Reset this step and try again. -1 mark.", visible: true});
                        conicalflask.setState({draggable: false});
                        pipette.setState({draggable: false});
                        experiment.failStep(1);
                    }
                    if(conicalflask.state.drops > 5) {
                        warningmessage.setState({message: "You have overfilled the flask. Reset this step and try again, putting the correct amount in the flask. -1 mark.", visible: true});
                        conicalflask.setState({draggable: false});
                        pipette.setState({draggable: false});
                        experiment.failStep(1);
                    }
                }
                experiment.update();
            }
        },
        ondragleave: function(event) {},
    });

    /* --- Draggable Functions --- */
    /*-We need separate draggable functions for every draggable instance, so that they won't snap to the wrong dropzone.
    =Using the same draggable function for more than one element, if those elements have a specified dropzone they snap to,
    they will snap to each other's dropzones.*/

    //Default draggable config, used as a base.
    var draggableConfig = (
        {
            inertia = true,
            autoScroll = true,
            restrict,
            onstart,
            onmove = dragMoveListener,
            onend,
        } = {},
        ) => ({
            inertia,
            autoScroll,
            onstart,
            onmove,
            onend,
        });

    //Default snap config, used as a base.
    var snapConfig = {
        mode: 'anchor',
        anchors: [],
        range: Infinity,
        //Set the elementOrigin to be the center of the element (x:0 is left, x:1 is right, y:0 is top, y:1 is bottom).
        elementOrigin: { x: 0.5, y: 0.5 },
        endOnly: true,
    };

    //Normal draggable function
    interact('.draggable')
    .draggable(draggableConfig())
    .snap(snapConfig);

    //Burette draggable function
    interact('.burette_draggable')
    .draggable(
        draggableConfig({
            onstart: function(event) {
                //If the burette.startPos isn't set -> in it's starting value, it is null.
                if (!burette.startPos) {
                    //Set a new variable, 'rect' with the burette's rectangle.
                    var rect = interact.getElementRect(event.target);
                    //Record center point when starting the very first a drag.
                    burette.startPos = {
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2,
                    };
                }
                //Snap to the start position.
                event.interactable.snap({ anchors: [burette.startPos] });
            },
        }),
    )
    .snap(snapConfig);

    //Funnel draggable function
    interact('.funnel_draggable')
    .draggable(draggableConfig())
    .snap(snapConfig);

    //Flask draggable function
    interact('.flask_draggable')
    .draggable(
        draggableConfig({
            onstart: function(event) {
                conicalflask.setState({
                    interaction: event.interaction,
                    element: event.target,
                });
            },
        }),
    )
    .snap(snapConfig);
        
    //Pipette draggable function
    interact('.pipette_draggable')
    .draggable(
        draggableConfig({
            inertia: false,
            onstart: function(event) {
                pipette.setState({
                    interaction: event.interaction,
                    element: event.target,
                });
            },
        }),
    );

    //Sulfuric Acid draggable function
    interact('.sulfacid_draggable').draggable(
    draggableConfig({  
        inertia: false,
        onstart: function(event) {
            sulfuricacid.setState({
                interaction: event.interaction,
                element: event.target,
            });
        },      
        onmove: sa_dragMoveListener,      
        onend: function(event) {
            //Set the Sulfuric Acid bottle's transform rotation to be 0degrees.
            event.target.style.webkitTransform = event.target.style.transform = event.target.style.transform.split(
            'rotate',
            )[0];
        },
    }),
    );

    //Methyl Orange draggable function
    interact('.methylorange_draggable').draggable(
    draggableConfig({  
        inertia: false,
        onstart: function(event) {
            methylorange.setState({
                interaction: event.interaction,
                element: event.target,
            });
        },      
        onmove: sa_dragMoveListener,      
        onend: function(event) {
            //Set the Sulfuric Acid bottle's transform rotation to be 0degrees.
            event.target.style.webkitTransform = event.target.style.transform = event.target.style.transform.split(
            'rotate',
            )[0];
        },
    }),
    );
    
    //NaOH Bottle draggable function
    interact('.naohbottle_draggable').draggable(
    draggableConfig({  
        inertia: false,
        onstart: function(event) {
            naohbottle.setState({
                interaction: event.interaction,
                element: event.target,
            });
        },      
        onmove: sa_dragMoveListener,      
        onend: function(event) {
            //Set the Sulfuric Acid bottle's transform rotation to be 0degrees.
            event.target.style.webkitTransform = event.target.style.transform = event.target.style.transform.split(
            'rotate',
            )[0];
        },
    }),
    );
}

/* --- dragMoveListener functions --- */

//The normal dragMoveListener, used for every draggable except for the Sulfuric Acid.
function dragMoveListener(event) {
    var target = event.target,
    //Keep the dragged position in the data-x/data-y attributes.
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx/scale,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy/scale;
    //Translate the element.
    target.style.webkitTransform = target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

    //Update the posiion attributes.
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

//New dragMoveListener so we are able to display tilting, where the old function (above) wouldn't allow this
//This is used for the Sulfuric Acid bottle, aswell as the Methyl Orange Indicator.
function sa_dragMoveListener(event) {
    var target = event.target,
    //Keep the dragged position in the data-x/data-y attributes.
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx/scale,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy/scale;
    
    //If the element's "inDropzone" data-attribute is set to true, when moved we translate the element normally, however allow the new tilting
    if (target.dataset.inDropzone == 'true') {
        target.style.webkitTransform = target.style.transform =
        'translate(' +
        x +
        'px, ' +
        y +
        'px) ' +
        target.style.transform.split(') ')[1];
    } else {
        //Otherwise, we translate the element with a 45degree tilt. This is so it suggests to the user that it needs to be poured.
        target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px, ' + y + 'px) rotate(45deg)';
    }
    //Update the posiion attributes.
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

/* --- Toggle Help Code --- */
function toggleHelp() {
    helpState = !helpState;
    if (helpState) {
        document.getElementById('helpContainer').classList.add('helpOpen');
        document.getElementById('helpTitleContainer').classList.remove('noshow');
        document.getElementById('helpContentContainer').classList.remove('noshow');
    } else {
        document.getElementById('helpContainer').classList.remove('helpOpen');
        document.getElementById('helpTitleContainer').classList.add('noshow');
        document.getElementById('helpContentContainer').classList.add('noshow');
    }
}

window.toggleHelp = toggleHelp;
window.toggleTapState = burettetap.toggleTapState;
window.checkQuestionAnswer = question.checkAnswer;
window.resetStep = function () {
    experiment.resetStep();
}
window.restartExperimentClick = function() {
    experiment.resetExperiment(true);
}
window.restartExperimentClickNoProcedure = function() {
    experiment.resetExperiment(false);
}

window.onload = function() {
    var jumpToStepElement = document.getElementById('jumpToStep');
    if (!DEVELOPMENT) {
        jumpToStepElement.parentElement.removeChild(jumpToStepElement);
    } else {
        document.getElementById('jumpToStepBtn').onclick = function() {
            var text = document.getElementById('jumpToStepText').value;
            if(text == "7")
                experiment.setState({ complete: true });
            else
                experiment.setState({ step: text });
        };
    }
    init();
    document.getElementById('helpContent').innerHTML =
    config.helpMessages[experiment.state.step - 1];
};

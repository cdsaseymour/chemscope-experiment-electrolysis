import interact from 'interactjs';
import experiment from './experiment.js';
import hclbottle from './hclbottle.js';
import naohbottle from './naohbottle.js';
import polystyrenecup from './polystyrenecup.js';
import beaker from './beaker.js';
import measuringcylinder50 from './measuringcylinder50.js';
import measuringcylinder10 from './measuringcylinder10.js';
import thermometer from './thermometer.js';
import warningmessage from './warningmessage.js';
import help from './help.js';
import table from './table.js';
import config from './config.js';

/*--- Dropzone Code ---*/

interact('.hcl_dropzone').dropzone({
    accept: '.bottle_drag-drop',
    overlap: 0.3,
    ondragenter: function(event) {
        if(event.relatedTarget.getAttribute('id') == "naohContainer") {
            warningmessage.setState({message: "You have put the wrong liquid in the measuring cylinder. Reset this step and try again. -1 mark", visible: true});
            hclbottle.setState({draggable: false});
            naohbottle.setState({draggable: false});
            measuringcylinder50.setState({draggable: false, shouldPour: false});
            polystyrenecup.setState({draggable: false});
            experiment.failStep(1, 1);
        } else {
            hclbottle.setState({inDropzone: true});
            hclbottle.dropzoneFillTimerID = setInterval(function() {
                if (measuringcylinder50.state.volume <= 30) {
                    measuringcylinder50.setState({ volume: measuringcylinder50.state.volume + 10 });
                    if(measuringcylinder50.state.volume > 30) {
                        warningmessage.setState({message: "You have overfilled the 50cm³ measuring cylinder. Reset the step and put the correct amount in. -2 marks.", visible: true});
                        hclbottle.setState({draggable: false});
                        measuringcylinder50.setState({draggable: false, shouldPour: false});
                        polystyrenecup.setState({draggable: false});
                        experiment.failStep(1, 2);
                    }else if(measuringcylinder50.state.volume == 30) {
                        measuringcylinder50.setState({shouldPour: true});
                    }
                }
            }, 1000);
        }
    },
    ondragleave: function(event) {
        hclbottle.setState({inDropzone: false});  
        clearTimeout(hclbottle.dropzoneFillTimerID);
    },
    ondrop: function(event) {
        hclbottle.setState({inDropzone: false});  
        clearTimeout(hclbottle.dropzoneFillTimerID);
    }
});

interact('.naoh_dropzone').dropzone({
    accept: '.bottle_drag-drop',
    overlap: 0.3,
    ondragenter: function(event) {
        if(event.relatedTarget.getAttribute('id') == "hclContainer") {
            warningmessage.setState({message: "You have put the wrong liquid in the measuring cylinder. Reset this step and try again. -1 mark", visible: true});
            hclbottle.setState({draggable: false});
            naohbottle.setState({draggable: false});
            measuringcylinder10.setState({draggable: false, shouldPour: false});
            polystyrenecup.setState({draggable: false});
            experiment.failStep(1, 1);
        } else {
            naohbottle.setState({inDropzone: true});
            naohbottle.dropzoneFillTimerID = setInterval(function() {
                if (measuringcylinder10.state.volume <= 5) {
                    measuringcylinder10.setState({ volume: measuringcylinder10.state.volume + 1 });
                    if(measuringcylinder10.state.volume > 5) {
                        warningmessage.setState({message: "You have overfilled the 10cm³ measuring cylinder. Reset the step and put the correct amount in. -2 marks.", visible: true});
                        naohbottle.setState({draggable: false});
                        measuringcylinder10.setState({draggable: false, shouldPour: false});
                        polystyrenecup.setState({draggable: false});
                        experiment.failStep(1, 2);
                    }else if(measuringcylinder10.state.volume == 5) {
                        measuringcylinder10.setState({shouldPour: true});
                    }
                }
            }, 1000);
        }
    },
    ondragleave: function(event) {
        naohbottle.setState({inDropzone: false});  
        clearTimeout(naohbottle.dropzoneFillTimerID);
    },
    ondrop: function(event) {
        naohbottle.setState({inDropzone: false});  
        clearTimeout(naohbottle.dropzoneFillTimerID);
    }
});

interact('.measuringCylinder_dropzone').dropzone({
    accept: '.measuringCylinder_drag-drop',
    overlap: 0.3,
    ondragenter: function(event) {
        if(event.relatedTarget.getAttribute('id') == "measuringCylinder50Container") {
            measuringcylinder50.setState({inDropzone: true});
            if(measuringcylinder50.state.volume == 30) {
                setTimeout(function() {
                    polystyrenecup.setState({volume: 30});
                    experiment.update();
                }, 1000);
            }
        }else if(event.relatedTarget.getAttribute('id') == "measuringCylinder10Container") {
            measuringcylinder10.setState({inDropzone: true});
            if(measuringcylinder10.state.volume == 5) {
                setTimeout(function() {
                    polystyrenecup.setState({naohVolume: polystyrenecup.state.naohVolume + 5});
                    experiment.update();
                }, 1000);
            }
        }
    },
    ondragleave: function(event) {
        if(event.relatedTarget.getAttribute('id') == "measuringCylinder50Container")
            measuringcylinder50.setState({inDropzone: false});
        else if(event.relatedTarget.getAttribute('id') == "measuringCylinder10Container")
            measuringcylinder10.setState({inDropzone: false});
    },
});

interact('.polystyreneCup_dropzone').dropzone({
    accept: '.polystyreneCup_drag-drop',
    overlap: 0.3,
    ondragenter: function(event) {
        //Set the 'dropRect' variable to be equal to the dropzone's rectangle,
        //and set 'dropCenter' to be the coordinates of the center of the dropzone.
        var dropRect = interact.getElementRect(event.target),
        dropCenter = {
            x: dropRect.left + dropRect.width / 2,
            y: dropRect.top + dropRect.height / 2,
        };
        //Snap the polystyrene cup to the center of the dropzone when it enters.
        event.draggable.snap({ anchors: [dropCenter] });
        polystyrenecup.setState({dropzoneDraggable: event.draggable});
    },
    ondrop: function(event) {
        polystyrenecup.setState({inPosition: true, draggable: false});
        experiment.update();
    },
});

interact('.beaker_dropzone').dropzone({
    accept: '.beaker_drag-drop',
    overlap: 0.3,
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
        beaker.setState({dropzoneDraggable: event.draggable});
    },
    ondrop: function(event) {
        beaker.setState({draggable: false});
        polystyrenecup.setState({draggable: true});
    },
});

interact('.thermometer_dropzone').dropzone({
    accept: '.thermometer_drag-drop',
    overlap: 0.25,
    ondragenter: function(event) {
        thermometer.setState({inDropzone: true});
        if(experiment.state.step == 3) {
            thermometer.measureTemperatureTimeoutID = 
                setTimeout(function() {
                    thermometer.setState({celciusMeasured: config.thermometerTemperatures[experiment.state.trial - 1][1]});
                }, 1000);
        } else if(experiment.state.step == 5) {
            thermometer.measureTemperatureTimeoutID = 
                setTimeout(function() {
                    thermometer.setState({celciusMeasured: config.thermometerTemperatures[experiment.state.trial - 1][2 + experiment.state.step6Repeats - (experiment.state.trial == 2 ? 7 : 0)]});
                }, 1000);
        }
    },
    ondragleave: function(event) {
        clearTimeout(thermometer.measureTemperatureTimeoutID);
        thermometer.setState({inDropzone: false});
    }
});

/*--- Draggable Code ---*/

//Default draggable config, used as a base.
var draggableConfig = (
    {
        inertia = false,
        autoScroll = true,
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

interact('.hcl_draggable')
    .draggable(draggableConfig({
        onmove: pourDragMoveListener,
        onend: function(event) {
            //Set the Sulfuric Acid bottle's transform rotation to be 0degrees.
            event.target.style.webkitTransform = event.target.style.transform = event.target.style.transform.split('rotate')[0];
        },
    }));

interact('.naoh_draggable')
    .draggable(draggableConfig( {
        onmove: pourDragMoveListener,
        onend: function(event) {
            //Set the Sulfuric Acid bottle's transform rotation to be 0degrees.
            event.target.style.webkitTransform = event.target.style.transform = event.target.style.transform.split('rotate')[0];
        },
    }));

interact('.polystyreneCup_draggable')
    .draggable(draggableConfig())
    .snap(snapConfig);

interact('.beaker_draggable')
    .draggable(draggableConfig())
    .snap(snapConfig);

interact('.measuringCylinder50_draggable')
    .draggable(draggableConfig({
        onstart: function(event) {
            measuringcylinder50.setState({dragInteraction: event.interaction});
        },
        onmove: mcPourDragMoveListener,
        onend: function(event) {
            //Set the Sulfuric Acid bottle's transform rotation to be 0degrees.
            event.target.style.webkitTransform = event.target.style.transform = event.target.style.transform.split('rotate')[0];
        },
    }));

interact('.measuringCylinder10_draggable')
    .draggable(draggableConfig({
        onstart: function(event) {
            measuringcylinder10.setState({dragInteraction: event.interaction});
            if(experiment.state.trial == 2)
                polystyrenecup.state.dropzoneDraggable.snap(true);
        },
        onmove: mcPourDragMoveListener,
        onend: function(event) {
            //Set the Sulfuric Acid bottle's transform rotation to be 0degrees.
            event.target.style.webkitTransform = event.target.style.transform = event.target.style.transform.split('rotate')[0];
        },
    }));

interact('.thermometer_draggable')
    .draggable(draggableConfig());

interact('.table_draggable')
    .allowFrom('.tableDragHandle')
    .draggable(draggableConfig());

//The normal dragMoveListener, used for every draggable except for the Sulfuric Acid.
function dragMoveListener(event) {
    var target = event.target,
    //Keep the dragged position in the data-x/data-y attributes.
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    //Translate the element.
    target.style.webkitTransform = target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

    //Update the posiion attributes.
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

//New dragMoveListener so we are able to display tilting, where the old function (above) wouldn't allow this
//This is used for the HCL bottle and NaOH bottle.
function pourDragMoveListener(event) {
    var target = event.target,
    //Keep the dragged position in the data-x/data-y attributes.
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    //If the element's "inDropzone" data-attribute is set to true, when moved we translate the element normally, however allow the new tilting
    if (target.dataset.inDropzone == 'true') {
        target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(80deg)';
    } else {
        //Otherwise, we translate the element with a 45degree tilt. This is so it suggests to the user that it needs to be poured.
        target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(45deg)';
    }
    //Update the posiion attributes.
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

//Another different dragMoveListener just for the measuring cylinders. This is so that before they have the correct volume, we can have the normal behaviour (no tilting). Once the have the correct volume, we can then allow tilting.
//e.g. Step 1 - We don't want tilting before the measuring cylinder has been filled to 30cm3. Once it has, we want the cylinder to tilt so the user knows that it needs to be poured.
function mcPourDragMoveListener(event) {
    var target = event.target,
    //Keep the dragged position in the data-x/data-y attributes.
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    
    var cylinderType = (target.getAttribute('id').includes('50') ? measuringcylinder50 : measuringcylinder10);
    
    //If the element's "inDropzone" data-attribute is set to true, when moved we translate the element normally, however allow the new tilting
    if (target.dataset.inDropzone == 'true') {
        target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(80deg)';
    } else {
        //Otherwise, we translate the element with a 45degree tilt. This is so it suggests to the user that it needs to be poured.
        target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)' + (cylinderType.state.shouldPour ? 'rotate(45deg)' : '');
    }
    //Update the posiion attributes.
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

window.toggleHelp = function() {
    help.toggleHelp();
}
window.toggleTable = function() {
    table.toggleTable();
}
window.checkTableInput = function(inputElement) {
    table.checkTableInput(inputElement);
}
window.resetStep = function() {
    experiment.resetStep();
}

window.onload = function() {
    var jumpToStepElement = document.getElementById('jumpToStep');
    if (!DEVELOPMENT) {
        jumpToStepElement.parentElement.removeChild(jumpToStepElement);
    } else {
        document.getElementById('jumpToStepBtn').onclick = function() {
            var text = document.getElementById('jumpToStepText').value;
            experiment.setState({ step: text });
        };
    }
    help.loadHelpMessage(1);
};
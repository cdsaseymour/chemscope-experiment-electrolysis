import interact from 'interactjs';
import experiment from './experiment.js';
import warningmessage from './warningmessage.js';
import help from './help.js';
import config from './config.js';
import cuCl2Solution from './cucl2solution.js';
import beaker from './beaker.js';
import carbonrods from './carbonrods.js';
import crocclips from './crocclips.js';
import dropzones from './dropzones.js';
import powersupply from './powersupply.js';
import tweezers from './tweezers.js';
import table from './table.js';

/*--- Dropzone Code ---*/

interact('.cuCl2_dropzone').dropzone({
    accept: '.cuCl2_drag-drop',
    overlap: 0.3,
    ondragenter: function(event) {
        cuCl2Solution.setState({inDropzone: true});
        cuCl2Solution.dropzoneFillTimerID = setInterval(function() {
            if(beaker.state.volume <= 50) {
                //Call setState for the beaker twice as we need to volume to update so the label is accurate. If we did it at the same time, the label would be 5cm³ below the correct value.
                beaker.setState({volume: beaker.state.volume + 5});
                beaker.setState({labelContent: "Volume: <span id=\"volumeHighlight\">" + beaker.state.volume + "cm³</span>"});
            }
            if(beaker.state.volume > 50) {
                warningmessage.setState({message: "You have added too much Copper (II) Chloride Solution. Reset the step and pour in the correct amount. -2 marks.", visible: true});
                experiment.failStep(2);
                clearTimeout(cuCl2Solution.dropzoneFillTimerID);
                cuCl2Solution.setState({draggable: false});
                cuCl2Solution.state.draggableInteraction.stop();
            }
        }, 500);
        
    },
    ondragleave: function(event) {
        cuCl2Solution.setState({inDropzone: false});  
        clearTimeout(cuCl2Solution.dropzoneFillTimerID);
        if(beaker.state.volume == 50)
            experiment.update();
    },
    ondrop: function(event) {
        cuCl2Solution.setState({inDropzone: false});  
        clearTimeout(cuCl2Solution.dropzoneFillTimerID);
    }
});

interact('.carbonRod_dropzone').dropzone({
    accept: '.carbonRod_drag-drop',
    overlap: 0.5,
    ondrop: function(event) {
        if(isOverlapping(document.getElementById('carbonRod1Container'), document.getElementById('carbonRod2Container'))) {
            warningmessage.setState({message: "You have placed the carbon rods so that they touch. Reset the step and correctly place the carbon rods. -2 marks.", visible: true});
            experiment.failStep(2);
            carbonrods.setState({draggable: false});
        } else if(isOverlapping(document.getElementById('carbonRod1Container'), event.target) && isOverlapping(document.getElementById('carbonRod2Container'), event.target)) {
            carbonrods.setState({inPosition: true});
            experiment.update();
        }
            
    }
});

interact('.crocClip1_dropzone').dropzone({
    accept: '.crocClip1_drag-drop',
    overlap: 0.93,
    ondrop: function(event) {
        if(isOverlapping(document.getElementById('crocClip2Container'), document.getElementById('crocClip2Dropzone'))) {
            crocclips.setState({inPosition: true});
            experiment.update();
        }
    }
});

interact('.crocClip2_dropzone').dropzone({
    accept: '.crocClip2_drag-drop',
    overlap: 0.93,
    ondrop: function(event) {
        if(isOverlapping(document.getElementById('crocClip1Container'), document.getElementById('crocClip1Dropzone'))) {
            crocclips.setState({inPosition: true});
            experiment.update();
        }
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

interact('.cuCl2_draggable')
    .draggable(draggableConfig( {
        onmove: pourDragMoveListener,
        onstart: function(event) {
          cuCl2Solution.setState({draggableInteraction: event.interaction});  
        },
        onend: function(event) {
            //Set the Sulfuric Acid bottle's transform rotation to be 0degrees.
            event.target.style.webkitTransform = event.target.style.transform = event.target.style.transform.split('rotate')[0];
        },
    }));

interact('.carbonRod_draggable')
    .draggable(draggableConfig());

interact('.crocClip_draggable')
    .draggable(draggableConfig());

interact('.table_draggable')
    .allowFrom('.tableDragHandle')
    .draggable(draggableConfig());

interact('.tweezers_draggable')
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

//Function to determine whether the 2 carbon rods are overlapping. If they are, we fail the step. 
function isOverlapping(element1, element2) {
    var rect1 = element1.getBoundingClientRect();
    var rect2 = element2.getBoundingClientRect();

    return !(
      rect1.top > rect2.bottom ||
      rect1.right < rect2.left ||
      rect1.bottom < rect2.top ||
      rect1.left > rect2.right
    );
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

window.isOn = function() {
    powersupply.turnOn();
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
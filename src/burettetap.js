import config from './config.js';
import experiment from './experiment.js';
import funnel from './funnel.js';
import burette from './burette.js';

var state = {
  closed: false,
  visible: false,
};

function setState(newState) {
  Object.assign(state, newState);

  if (state.visible) {
    document.getElementById('tapState').classList.remove('noshow');
    document.getElementById('tapClick').classList.remove('noshow');
  } else {
    document.getElementById('tapState').classList.add('noshow');
    document.getElementById('tapClick').classList.add('noshow');
  }

  //Set the label beside the tap to correctly display the tapState.
  document.getElementById('tapState').innerHTML = state.closed
    ? 'Closed'
    : 'Open';
}

function toggleTapState() {
  //At step 3, we only need to close the tap, thus we need to prevent the tap being opened again.
  if (experiment.state.step == 3) {
    //Set the tap to be closed. We don't want it to be opened again, thus we set it to true instead of toggling it.
    setState({ closed: true });
    //Add dragging to the funnel as it is needed to complete the step.
    funnel.setState({ draggable: true });
  } else if(experiment.state.step == 5){
    //Toggle the state of the tap.
    setState({ closed: !state.closed });
      //If the tap is closed.
//      if(experiment.state.step == 5) {
          if (state.closed) {
            //Clear the interval that runs the 'startTitration' function every 2500 milliseconds.
            clearInterval(burette.tiIntervalID);
            experiment.update();
            //Otherwise, run the 'startTitration' function every 2500 milliseconds.
          } else burette.tiIntervalID = setInterval(burette.startTitration, 1000);
//      }
  }
}

export default { state, setState, toggleTapState };

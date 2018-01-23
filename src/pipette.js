import resetPosition from './resetposition.js';

var state = {
    full: false,
    liquid: 0, //o = naoh, 1 = methyl orange, 2 = sulfuric acid
    draggable: true,
    interaction: null,
    element: null,
    visible: true,
};

function setState(newState) {
  Object.assign(state, newState);
  if (state.full) {
    //Set the pipette's image to the image where it's full.
    document.getElementById('pipetteImg').src = state.liquid != 1 ? './images/pipette/pipettenaoh.png' : "./images/pipette/pipettemethyl.png";
  } else {
    //Set the pipette's image to the image where it's empty.
    document.getElementById('pipetteImg').src = './images/pipette/pipette.png';
  }
  if (state.draggable) {
    document.getElementById('pipetteContainer').classList.add('pipette_draggable');
  } else {
    document.getElementById('pipetteContainer').classList.remove('pipette_draggable');
    if (state.interaction) {
      state.interaction.stop();
      resetPosition(state.element);
    }
  }

  if (state.visible) {
    document.getElementById('pipetteContainer').classList.remove('noshow');
  } else {
    document.getElementById('pipetteContainer').classList.add('noshow');
  }
}

export default { state, setState };

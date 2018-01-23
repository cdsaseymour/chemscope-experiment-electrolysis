import config from './config.js';

var state = {
  draggable: false,
  visible: true,
};

function setState(newState) {
  Object.assign(state, newState);

  if (state.draggable) {
    document.getElementById('clampContainer').classList.add('draggable');
  } else {
    document.getElementById('clampContainer').classList.remove('draggable');
  }

  if (state.visible) {
    document.getElementById('clampContainer').classList.remove('noshow');
  } else {
    document.getElementById('clampContainer').classList.add('noshow');
  }
}

export default { state, setState };

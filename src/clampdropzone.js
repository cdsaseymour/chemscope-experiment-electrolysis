import config from './config.js';

var state = {
  clampEntered: false,
  visible: false,
};

function setState(newState) {
  Object.assign(state, newState);

  if (state.clampEntered) {
    document.getElementById('clampDropzone').classList.add('clampEntered');
  } else {
    document.getElementById('clampDropzone').classList.remove('clampEntered');
  }

  if (state.visible) {
    document.getElementById('clampDropzone').classList.remove('noshow');
  } else {
    document.getElementById('clampDropzone').classList.add('noshow');
  }
}

export default { state, setState };

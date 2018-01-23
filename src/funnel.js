import config from './config.js';

var state = {
  draggable: false,
  inPosition: false,
  isFilled: false,
  visible: true,
};

function setState(newState) {
  Object.assign(state, newState);

  if (state.draggable) {
    document.getElementById('funnelContainer').classList.add('funnel_draggable');
  } else {
    document.getElementById('funnelContainer').classList.remove('funnel_draggable');
  }

  if (state.inPosition) {
    document.getElementById('funnelImg').src = './images/funnel/funnelin.png';
  } else {
    document.getElementById('funnelImg').src = './images/funnel/funnel.png';
  }

  if (state.isFilled) {
    document.getElementById('funnelImg').src =
      './images/funnel/funnelin_naoh.png';
  } else {
    if (state.inPosition) {
      document.getElementById('funnelImg').src =
        './images/funnel/funnelin.png';
    } else {
      document.getElementById('funnelImg').src = './images/funnel/funnel.png';
    }
  }

  if (state.visible) {
    document.getElementById('funnelContainer').classList.remove('noshow');
  } else {
    document.getElementById('funnelContainer').classList.add('noshow');
  }
}

export default { state, setState };

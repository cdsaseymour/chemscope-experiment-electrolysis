var state = {
    draggable: false,
    inPosition: false,
};

function setState(newState) {
    Object.assign(state, newState);
    if(state.draggable) {
        document.getElementById('crocClip1Container').classList.add('crocClip_draggable');
        document.getElementById('crocClip2Container').classList.add('crocClip_draggable');
    } else {
        document.getElementById('crocClip1Container').classList.remove('crocClip_draggable');
        document.getElementById('crocClip2Container').classList.remove('crocClip_draggable');
    }
}

export default { state, setState };
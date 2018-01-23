var state = {
    visible: true,
};

function setState(newState) {
    Object.assign(state, newState);
    if (state.visible) {
        document.getElementById('stepsContainer').classList.remove('noshow');
    } else {
        document.getElementById('stepsContainer').classList.add('noshow');
    }
}

export default { state, setState };

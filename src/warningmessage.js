var state = {
    visible: false,
    message: ""
};

function setState(newState) {
    Object.assign(state, newState);
    document.getElementById('warningMessage').innerHTML = state.message;
    if (state.visible) {
        document.getElementById('warningContainer').classList.remove('noshow');
    } else {
        document.getElementById('warningContainer').classList.add('noshow');
    }
}

export default { state, setState };

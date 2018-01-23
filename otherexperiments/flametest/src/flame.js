var state = {
    changeColour: false
};

function setState(newState) {
    Object.assign(state, newState);
}

export default { state, setState };
var state = {
    currentChemical: null,
};

function setState(newState) {
    Object.assign(state, newState);
}

export default { state, setState };

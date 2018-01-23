var state = {
    visible: false,
}

function setState(newState) {
    Object.assign(state, newState);
    if (state.visible) {
        document.getElementById('colourChartContainer').classList.remove('noshow');
    } else {
        document.getElementById('colourChartContainer').classList.add('noshow');
    }
}

export default { state, setState };

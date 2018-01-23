var state = {
    names: ['sodium', 'na'],
    flameColour: "Yellow",
    hintType: 0,
    hintUsed: false,
    hasGuessed: false,
}

function setState(newState) {
    Object.assign(state, newState);
    if(state.hasGuessed)
        document.getElementById('sodium').getElementsByTagName('img')[0].src = "./images/chemicals/sodium/sodiumcomplete.png";
}

export default { state, setState };

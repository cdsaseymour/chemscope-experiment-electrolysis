var state = {
    names: ['calcium', 'ca'],
    flameColour: "Red",
    hintType: 1,
    hintUsed: false,
    hasGuessed: false,
}

function setState(newState) {
    Object.assign(state, newState);
    if(state.hasGuessed)
        document.getElementById('calcium').getElementsByTagName('img')[0].src = "./images/chemicals/calcium/calciumcomplete.png";
}

export default { state, setState };

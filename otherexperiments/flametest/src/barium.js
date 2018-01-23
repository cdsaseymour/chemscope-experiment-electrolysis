var state = {
    names: ['barium', 'ba'],
    flameColour: "Green",
    hintType: 1,
    hintUsed: false,
    hasGuessed: false,
}

function setState(newState) {
    Object.assign(state, newState);
    if(state.hasGuessed)
        document.getElementById('barium').getElementsByTagName('img')[0].src = "./images/chemicals/barium/bariumcomplete.png";
}

export default { state, setState };

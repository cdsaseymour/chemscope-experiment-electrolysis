var state = {
    names: ['lithium', 'li'],
    flameColour: "Crimson",
    hintType: 0,
    hintUsed: false,
    hasGuessed: false,
}

function setState(newState) {
    Object.assign(state, newState);
    if(state.hasGuessed)
        document.getElementById('lithium').getElementsByTagName('img')[0].src = "./images/chemicals/lithium/lithiumcomplete.png";
}

export default { state, setState };

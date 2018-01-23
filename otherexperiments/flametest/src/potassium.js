var state = {
    names: ['potassium', 'k'],
    flameColour: "Lilac",
    hintType: 0,
    hintUsed: false,
    hasGuessed: false,
}

function setState(newState) {
    Object.assign(state, newState);
    if(state.hasGuessed)
        document.getElementById('potassium').getElementsByTagName('img')[0].src = "./images/chemicals/potassium/potassiumcomplete.png";
}

export default { state, setState };

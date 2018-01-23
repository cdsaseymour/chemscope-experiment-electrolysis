import dropzone from './dropzone.js';

var state = {
    visible: false
};

function setState(newState) {
    Object.assign(state, newState);
    if(state.visible) {
        document.getElementById("flameColour_container").classList.remove("noshow");
        document.getElementById("flameColour").innerHTML = dropzone.state.currentChemical.state.flameColour + " Flame";  
    } else
        document.getElementById("flameColour_container").classList.add("noshow");
}

export default { state, setState };

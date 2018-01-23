import experiment from './experiment.js';
import thermometer from './thermometer.js';
import config from './config.js';

var state = {
    draggable: false,
    toggled: false,
    enabled: false,
    meansCorrect: 0,
};

function setState(newState) {
    Object.assign(state, newState);
    if(state.draggable)
        document.getElementById('tableContainer').classList.add('table_draggable')
    else
        document.getElementById('tableContainer').classList.remove('table_draggable')
        
    
    if (state.toggled)
        document.getElementById('tableContainer').classList.remove('noshow');
    else
        document.getElementById('tableContainer').classList.add('noshow');
        
    document.getElementById('tableButton').disabled = !state.enabled;
}

function toggleTable() {
    setState({toggled: !state.toggled, draggable: !state.draggable});
}

function checkTableInput(inputElement) {
    if(experiment.state.step >= 1 && experiment.state.step < 8 && !thermometer.state.inDropzone) return;
    for(var row = 0; row <= 8; row++) {
        for(var col = 0; col <= 2; col++) {
            if(inputElement.getAttribute('id') == ('ti_' + row + '-' + col) && inputElement.value == config.thermometerTemperatures[col][row + 1]) {
                if(experiment.state.step != 8) {
                    experiment.update();
                    inputElement.disabled = true;
                    inputElement.classList.add('inputCorrect');
                    if(row == 8) {
                        document.getElementById('ti_0-' + (col+1)).disabled = false;
                    } else
                        document.getElementById('ti_' + (row + 1) + '-' + col).disabled = false
                } else {
                    setState({meansCorrect: state.meansCorrect + 1});
                    experiment.update();
                    inputElement.disabled = true;
                    inputElement.classList.add('inputCorrect');
                }
            }
        }
    }
}

export default { state, setState, toggleTable, checkTableInput };

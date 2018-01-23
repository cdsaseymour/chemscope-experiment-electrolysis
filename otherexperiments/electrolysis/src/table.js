import config from './config.js';

var state = {
    draggable: false,
    toggled: false,
    enabled: false,
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
    for(var row = 0; row <= 3; row++) {
        for(var col = 0; col <= 1; col++) {
            for(var answerIterator = 0; answerIterator < config.tableAnswers[col][row].length; answerIterator++) {
                if(inputElement.getAttribute('id') == ('ti_' + row + '-' + col) && inputElement.value.toLowerCase() == config.tableAnswers[col][row][answerIterator]) {
                inputElement.disabled = true;
                inputElement.classList.add('inputCorrect');
                if(col != 1)
                    document.getElementById('ti_' + row + '-' + (col + 1)).disabled = false
                else if(row != 3)
                    document.getElementById('ti_' + (row + 1) + '-' + (col - 1)).disabled = false
            }   
            }
        }
    }
}

export default { state, setState, toggleTable, checkTableInput };
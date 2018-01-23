var state = {
    isCuCl2Dropzone: true,
    isCarbonRodDropzone: false,
    isCrocClipDropzone: false,
};

var measureTemperatureTimeoutID;

function setState(newState) {
    Object.assign(state, newState);
    if(state.isCuCl2Dropzone) {
        document.getElementById('cuCl2Dropzone').classList.add('cuCl2_dropzone');
        document.getElementById('cuCl2Dropzone').classList.remove('noshow');
    } else {
        document.getElementById('cuCl2Dropzone').classList.remove('cuCl2_dropzone');
        document.getElementById('cuCl2Dropzone').classList.add('noshow');
    }
    
    if(state.isCarbonRodDropzone) {
        document.getElementById('carbonRodDropzone').classList.add('carbonRod_dropzone');
        document.getElementById('carbonRodDropzone').classList.remove('noshow');
    } else {
        document.getElementById('carbonRodDropzone').classList.remove('carbonRod_dropzone');
        document.getElementById('carbonRodDropzone').classList.add('noshow');
    }
       
    
    if(state.isCrocClipDropzone) {
        document.getElementById('crocClip1Dropzone').classList.add('crocClip1_dropzone');
        document.getElementById('crocClip1Dropzone').classList.remove('noshow');
        document.getElementById('crocClip2Dropzone').classList.add('crocClip2_dropzone');
        document.getElementById('crocClip2Dropzone').classList.remove('noshow');
    } else {
        document.getElementById('crocClip1Dropzone').classList.remove('crocClip1_dropzone');
        document.getElementById('crocClip1Dropzone').classList.add('noshow');
        document.getElementById('crocClip2Dropzone').classList.remove('crocClip2_dropzone');
        document.getElementById('crocClip2Dropzone').classList.add('noshow');
    }
}

export default { state, setState };
import barium from './barium.js';
import calcium from './calcium.js';
import lithium from './lithium.js';
import potassium from './potassium.js';
import sodium from './sodium.js';

//List of chemicals in the experimen
var chemicals = [barium, calcium, lithium, potassium, sodium];

//A function used to find the current chemical based on it's id by looping through the chemicals array.
//This will compare the id given to the chemical's names[0], which is it's full name. E.g. lithium.
//Each chemical's id in HTML is it's name.
function findChemical(id) {
    for(var i = 0; i < chemicals.length; i++) {
        var chemical = chemicals[i];
        if(chemical.state.names[0] == id)
            return chemical;
    }
    return null;
}

export default {chemicals, findChemical};
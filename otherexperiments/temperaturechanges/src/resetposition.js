/* --- Reset Position code --- */
export default function resetPosition(element) {
//    console.log("Trying to reset position of " + element.getAttribute('id'));
    //Reset the transform translate of the element.
    element.style.transform = 'translate(0px, 0px)';
//    console.log("Element's transform is: " + element.style.transform);
    //Reset the data-x and data-y attributes to 0. Without this, the dragging would mess up/
    element.setAttribute('data-x', 0);
    element.setAttribute('data-y', 0);
//    console.log("Element's data-x is " + element.getAttribute('data-x') + " and it's data-y is " + element.getAttribute('data-y'));
}

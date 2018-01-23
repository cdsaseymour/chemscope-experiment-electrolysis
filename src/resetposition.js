/* --- Reset Position code --- */
export default function resetPosition(element) {
  //Reset the transform translate of the element.
  element.style.transform = 'translate(0px, 0px)';
  //Reset the data-x and data-y attributes to 0. Without this, the dragging would mess up/
  element.setAttribute('data-x', 0);
  element.setAttribute('data-y', 0);
}

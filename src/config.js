export default {
    //All image stages for the flask
    flaskImages: [
        './images/conicalflask/conicalflask.png', //Stage 0 -> empty
        './images/conicalflask/fill/conicalflask-5cm3.png', //Stage 1 -> 5cm3
        './images/conicalflask/fill/conicalflask-10cm3.png', //Stage 2 -> 10cm3
        './images/conicalflask/fill/conicalflask-15cm3.png', //Stage 3 -> 15cm3
        './images/conicalflask/fill/conicalflask-20cm3.png', //Stage 4 -> 20cm3
        './images/conicalflask/fill/conicalflask-25cm3.png', //Stage 5 -> full
    ],

    //All titration image stages for the flask.
    flaskTitrationImages: [
        './images/conicalflask/titration/conicalflask_titration%230.png',
        './images/conicalflask/titration/conicalflask_titration%231.png',
        './images/conicalflask/titration/conicalflask_titration%232.png',
        './images/conicalflask/titration/conicalflask_titration%233.png',
        './images/conicalflask/titration/conicalflask_titration%234.png',
        './images/conicalflask/titration/conicalflask_titration%235.png',
    ],

    //All image stages for the burette
    buretteImages: [
        './images/burette/burette.png', //Stage 0 -> empty
        './images/burette/fill/burette-45cm3.png', //Stage 1 -> 15cm3 (45cm3 line)
        './images/burette/fill/burette-30cm3.png', //Stage 2 -> 30cm3 (30cm3 line)
        './images/burette/fill/burette-15cm3.png', //Stage 3 -> 45cm3 (15cm3 line)
        './images/burette/fill/burette-0cm3.png', //Stage 4 -> full
    ],

    //All image stages for the burette, when the titration is taking place.
    buretteTitrationImages: [
        './images/burette/fill/burette-0cm3.png', //0cm3
        './images/burette/fill/burette-2cm3.png', //2cm3
        './images/burette/fill/burette-4cm3.png', //4cm3
        './images/burette/fill/burette-6cm3.png', //6cm3
        './images/burette/fill/burette-8cm3.png', //8cm3
        './images/burette/fill/burette-10cm3.png', //10cm3
        './images/burette/fill/burette-12cm3.png', //12cm3
        './images/burette/fill/burette-14cm3.png', //14cm3
        './images/burette/fill/burette-16cm3.png', //16cm3
        './images/burette/fill/burette-18cm3.png', //18cm3
        './images/burette/fill/burette-20cm3.png', //20cm3
        './images/burette/fill/burette-22cm3.png', //22cm3
        './images/burette/fill/burette-24cm3.png', //24cm3
    './images/burette/fill/burette-26cm3.png', //26cm3
    ],
    
    //All steps in the experiment
    experimentSteps: [
        'Only using the pipette, put exactly 25cm³ sodium hydroxide solution into the conical flask. You do not need to move the flask to complete this step.',
        'Put the clamp in the working area, and clamp the burette vertically in the clamp stand about halfway up its length.',
        'Close the burette tap. Place the funnel at the top of the burette, and use it to carefully fill the burette with dilute sulfuric acid (via the bottle, pouring slowly but continuously) to the 0cm³ line.',
        'Put 5 drops of methyl orange indicator into the conical flask, using the pipette and methyl orange bottle. Then place the conical flask under the burette.',
        'Open the tap so that sulfuric acid flows into the flask at a drop by drop rate. Watch the colour change closely. Immediately close the tap when the colour matches the highlighted colour on the chart.',
        'Read the burette scale carefully and record the volume of acid you added. This is your final reading.'
    ],

    //All help messages for every step.
    helpMessages: [
        'Drag the pipette over the NaOH bottle to fill it up. Then, the pipette can be dragged to the flask to put the NaOH into the flask. Repeat this 5 times.',
        'Drag and drop the clamp to the highlighted zone (working area), and then drag and drop the burette into place, with it being halfway clamped.',
        'Click on the burette tap to close it. The funnel can be dragged and dropped to the top of the burette, and then the Sulfuric Acid bottle can be dragged and held over the funnel to fill the burette.',
        'Drag the pipette over the Methyl Orange Indicator to fill it up. Then, the pipette can be dragged to the flask to put the the Methyl Orange Indicator into the flask. Repeat this 5 times.',
        'Click the tap to open it. Keep an eye on the colour of the solution in the flask. Wait for the flask to match the colour on the colour chart, and then click the tap to close it. If done correctly, the step will be complete.',
        'Read the level of acid in the burette scale, and input your answer into the given textbox.',
    ],
};

export default {
    thermometerTemperatures: [[
        //Trial 1
            21, //Default temperature (room temp)
            27, //Stage 1 temperature, no naoh
            29, //Stage 2 temperature, 5cm3 naoh
            33, //Stage 3 temperature, 10cm3 naoh
            34, //Stage 4 temperature, 15cm3 naoh
            37, //Stage 5 temperature, 20cm3 naoh
            44, //Stage 6 temperature, 25cm3 naoh
            42, //Stage 7 temperature, 30cm3 naoh
            38, //Stage 8 temperature, 35cm3 naoh
            36, //Stage 9 temperature, 40cm3 naoh
        ],
        //Trial 2
        [
            22, //Default temperature (room temp)
            26, //Stage 1 temperature, no naoh
            29, //Stage 2 temperature, 5cm3 naoh
            31, //Stage 3 temperature, 10cm3 naoh
            36, //Stage 4 temperature, 15cm3 naoh
            37, //Stage 5 temperature, 20cm3 naoh
            42, //Stage 6 temperature, 25cm3 naoh
            40, //Stage 7 temperature, 30cm3 naoh
            36, //Stage 8 temperature, 35cm3 naoh
            34, //Stage 9 temperature, 40cm3 naoh
        ],
        [
            0,
            26.5, //Stage 1 temperature, no naoh
            29, //Stage 2 temperature, 5cm3 naoh
            32, //Stage 3 temperature, 10cm3 naoh
            35, //Stage 4 temperature, 15cm3 naoh
            37, //Stage 5 temperature, 20cm3 naoh
            43, //Stage 6 temperature, 25cm3 naoh
            41, //Stage 7 temperature, 30cm3 naoh
            37, //Stage 8 temperature, 35cm3 naoh
            35, //Stage 9 temperature, 40cm3 naoh
        ]
    ],
    
    //All image stages for the flask
    measuringCylinder50FillImages: [
        './images/measuringcylinders/50cm3/default.png', //Stage 0 -> empty
        './images/measuringcylinders/50cm3/10cm3.png', //Stage 1 -> 10cm3
        './images/measuringcylinders/50cm3/20cm3.png', //Stage 1 -> 20cm3
        './images/measuringcylinders/50cm3/30cm3.png', //Stage 1 -> 30cm3
        './images/measuringcylinders/50cm3/40cm3.png', //Stage 4 -> 40cm3
    ],

    //All help messages for every step.
    helpMessages: [
        'First, hold the dilute hydochloric acid bottle over the top of the 50cm³ measuring cylinder and wait for it to fill to 30cm3. Then, drag and hold the 50cm³ measuring cylinder over the top of the polystyrene cup to fill that.',
        'Drag and drop the beaker into the designated working area. Then drag the polystyrene cup into this beaker and drop.',
        'Drag the thermometer to the polystyrene cup and dip half of it into the cup. Wait for a second for the thermometer to show a reading, and write this into the appropriate cell of the table (accessed through the "table" button).',
        'Drag and hold the NaOH bottle over the 10cm³ measuring cylinder until 5cm³ has been poured. Then, drag and hold the 10cm³ measuring cylinder over the cup (in the beaker) to pour the liquid into the cup.',
        'Drag the thermometer to the polystyrene cup (in the beaker) and dip half of it into the cup. Wait for a second for the thermometer to show a reading, and write this into the appropriate cell of the table.',
        'Repeat steps 4 & 5 until a total of 40cm³ of NaOH has been added to the cup (in the beaker).',
        'Repeat the whole experiment again to get a second set of readings.',
        'Work out the mean for each row of the table - by adding the first and second column cells in that row and dividing this number by two.  Do this for every row.',
    ],
};

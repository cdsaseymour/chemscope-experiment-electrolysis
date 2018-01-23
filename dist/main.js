var blinkTimerID;

function generateBackground() {
    const canvas = document.getElementById('star-background');

    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;

    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const totalStars = 50;
    const size = 0.1;

    const stars = [];

    for (let i = 0; i < totalStars; i++) {
      // Create circle object
      const star = {};

      // Set static geometric properties
      star.x = 1 + (Math.random() * canvas.width - 1);
      star.y = 1 + (Math.random() * canvas.height - 1);
      star.scale = 1 * (Math.random() + 0.1);

      // Set color based on size
      star.color = '#73cdff';

      // Push circle onto array
      stars.push(star);
    }

    let translateX = 0;
    let translateY = 0;
    const moveBy = 100;

    do {
      // Draw the circle
      const scale = 0.1 + Math.random() * 0.3;
      const star = new Path2D(`M 332.25647,385.51933 L 217.94322,325.58331 L 103.76342,385.77314 L 125.44132,258.53357 L 32.91382,168.54182 L 160.62472,149.83945 L 217.61942,34.031678 L 274.87122,149.71255 L 402.62329,168.13113 L 310.29602,258.32822 L 332.25647,385.51933 z`);
      translateX = translateX + moveBy > canvas.width ? 0 : translateX + moveBy;
      translateY = translateX + moveBy > canvas.width ? translateY + moveBy : translateY;
      ctx.translate(translateX, translateY);
      ctx.scale(scale, scale);
      ctx.fillStyle = '#73cdff';
      ctx.fill(star);
      ctx.scale(1/scale, 1/scale);
      ctx.translate(translateX * -1, translateY * -1);
    } while (translateY + moveBy < canvas.height);
}

function startBlinkTimer() {
    //Blink timer which simply changes the image of the professor to the professor blinking and then after 250ms reverts back to the
    //default image, every 10000ms / 10 seconds.
    blinkTimerID = setInterval(function() {
        document.getElementById('professor').src = "images/professor/blink.png";
        setTimeout(function() {
            document.getElementById('professor').src = "images/professor/default.png";
        }, 250)
    }, 10000);
};

function stopBlinkTimer() {
    clearInterval(blinkTimerID);
};

window.onload = function() {
    this.generateBackground();
    //Start the professor's blink timer.
    this.startBlinkTimer();
};